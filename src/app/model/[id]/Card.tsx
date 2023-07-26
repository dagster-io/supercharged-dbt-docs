export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow text-gray-700">
      {children}
    </div>
  );
};
