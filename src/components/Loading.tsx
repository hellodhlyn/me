export function Loading() {
  return (
    <div className="w-96 animate-pulse">
      <div className="w-2/5 h-6 bg-gray-500 rounded-md" />
      <ul className="mt-8 space-y-3">
        <li className="w-full h-4 bg-gray-500 rounded-md"></li>
        <li className="w-full h-4 bg-gray-500 rounded-md"></li>
        <li className="w-full h-4 bg-gray-500 rounded-md"></li>
        <li className="w-full h-4 bg-gray-500 rounded-md"></li>
      </ul>
    </div>
  );
}
