import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="section-shell py-8">
        <p className="text-center text-xs text-muted">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
