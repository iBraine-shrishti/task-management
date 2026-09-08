export default function ProjectDetails() {
  return (
    <div>
      <p className="text-sm font-semibold text-ibraine-blue">Project</p>
      <h1 className="mt-1 text-3xl font-extrabold">Nova Foods</h1>
      <div className="mt-6 card p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-ibraine-blue">
            Ongoing
          </span>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-ibraine-orange">
            High Priority
          </span>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">Service</p>
            <b>Social Media</b>
          </div>
          <div>
            <p className="text-xs text-gray-400">Deadline</p>
            <b>18 Sep 2026</b>
          </div>
          <div>
            <p className="text-xs text-gray-400">Progress</p>
            <b>68%</b>
          </div>
        </div>
      </div>
    </div>
  );
}
