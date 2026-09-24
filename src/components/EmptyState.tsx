import type { ReactNode } from "react";
import { FilmIcon } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="surface-panel flex flex-col items-center rounded-2xl px-6 py-14 text-center">
      <div className="gradient-brand mb-5 grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground">
        {icon ?? <FilmIcon className="h-6 w-6" aria-hidden="true" />}
      </div>
      <h2 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
