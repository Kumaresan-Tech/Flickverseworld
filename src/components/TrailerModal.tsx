import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { youTubeId } from "@/data/movies";

type TrailerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trailerUrl: string;
};

export function TrailerModal({ open, onOpenChange, title, trailerUrl }: TrailerModalProps) {
  const videoId = youTubeId(trailerUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">{title} — official trailer</DialogTitle>
        </DialogHeader>
        <div className="mt-2 aspect-video w-full overflow-hidden rounded-xl bg-background">
          {open && videoId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
        <a
          href={trailerUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Open on YouTube
        </a>
      </DialogContent>
    </Dialog>
  );
}
