const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-sm text-muted-foreground text-center font-mono">
          © {new Date().getFullYear()} Josua Simatupang
        </p>
      </div>
    </footer>
  );
};

export default Footer;
