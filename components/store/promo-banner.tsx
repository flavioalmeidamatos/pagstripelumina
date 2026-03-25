export function PromoBanner({ message }: { message: string }) {
  return (
    <div className="border-b border-border/80 bg-secondary/80 py-3 text-center text-sm text-secondary-foreground">
      {message}
    </div>
  );
}

