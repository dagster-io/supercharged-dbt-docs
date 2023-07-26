export const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className="text-lg font-bold py-4">{children}</header>;
};

export const Detail = ({
  title,
  detail,
}: {
  title: React.ReactNode;
  detail: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-uppercase text-lg font-bold">{title}</div>
      <div>{detail}</div>
    </div>
  );
};

export const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="sticky">{children}</th>
);
