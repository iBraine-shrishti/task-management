export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ibraine-blue">Client Portal</p>
        <h1 className="mt-1 text-3xl font-extrabold">Project Overview</h1>
      </div>
      <div className="card p-6">
        <p className="text-sm text-gray-500">Current project</p>
        <h2 className="mt-1 text-2xl font-bold">Nova Foods — Social Media</h2>
        <div className="mt-5 h-3 rounded-full bg-gray-100">
          <div className="h-3 w-[68%] rounded-full bg-gradient-to-r from-ibraine-blue to-sky-400" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>68% complete</span>
          <span>Due Sep 18</span>
        </div>
      </div>
    </div>
  );
}
