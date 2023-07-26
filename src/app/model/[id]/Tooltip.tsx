export const Tooltip = ({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: React.ReactNode;
}) => {
  return (
    <div className="group relative w-max">
      <span className="pointer">{children}</span>
      <span
        className="pointer-events-none absolute -top-7 left-0 px-4 py-2 rounded-md w-max opacity-0 transition-opacity group-hover:opacity-100 text-gray-900 bg:white p-1"
        style={{
          boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.12)",
          background: "#ffffff",
          zIndex: 99,
        }}
      >
        {tooltip}
      </span>
    </div>
  );
};
