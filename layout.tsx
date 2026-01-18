export const metadata = {
  title: 'Morning Checklist',
  description: 'Simple morning routine checklist'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f1f5f9' }}>
        {children}
      </body>
    </html>
  );
}
