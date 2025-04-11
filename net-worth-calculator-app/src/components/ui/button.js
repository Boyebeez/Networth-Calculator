
export function Button({ children, onClick }) {
  return <button onClick={onClick} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">{children}</button>;
}
