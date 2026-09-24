import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FlickVerse" },
      {
        name: "description",
        content:
          "Suggest a film, report a problem or just say hello. Send the FlickVerse team a message.",
      },
      { property: "og:title", content: "Contact — FlickVerse" },
      {
        property: "og:description",
        content: "Suggest a film or share feedback with the FlickVerse team.",
      },
    ],
  }),
  component: ContactPage,
});

type FormState = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 80) errors.name = "Name must be under 80 characters.";

  if (!email) errors.email = "An email address is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address doesn't look right.";
  else if (email.length > 160) errors.email = "Email must be under 160 characters.";

  if (!subject) errors.subject = "Add a short subject.";
  else if (subject.length > 120) errors.subject = "Subject must be under 120 characters.";

  if (message.length < 10) errors.message = "Your message needs at least 10 characters.";
  else if (message.length > 1000) errors.message = "Message must be under 1000 characters.";

  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-border bg-secondary/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary/60 focus:outline-none";

function ContactPage() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setValues(EMPTY);
    setSent(true);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Get in touch</h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Missing a favourite film, or spotted something broken? Send a note — messages stay in your
        browser for this demo.
      </p>

      {sent ? (
        <div className="surface-panel mt-10 rounded-2xl p-8 text-center">
          <span className="gradient-brand mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold text-foreground">Message sent</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Thanks for writing in. We'll get back to you as soon as a human is free.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 inline-flex rounded-xl border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="mt-10 space-y-5" onSubmit={onSubmit} noValidate>
          <Field
            id="name"
            label="Name"
            value={values.name}
            error={errors.name}
            placeholder="Ada Lovelace"
            onChange={set("name")}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            placeholder="you@example.com"
            onChange={set("email")}
          />
          <Field
            id="subject"
            label="Subject"
            value={values.subject}
            error={errors.subject}
            placeholder="A film you should add"
            onChange={set("subject")}
          />

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={values.message}
              maxLength={1000}
              placeholder="Tell us what's on your mind…"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              onChange={(event) => set("message")(event.target.value)}
              className={fieldClass}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <p
                id="message-error"
                className="text-xs text-destructive"
                role={errors.message ? "alert" : undefined}
              >
                {errors.message ?? ""}
              </p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {values.message.trim().length}/1000
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="gradient-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  error,
  placeholder,
  type = "text",
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
