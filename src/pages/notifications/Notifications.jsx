export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ibraine-blue">Workspace</p>
        <h1 className="mt-1 text-3xl font-extrabold">Notifications</h1>
      </div>
      <div className="card divide-y">
        {[
          "New client request · PixelCraft",
          "Asset uploaded · Nova Foods",
          "Employee submitted task for review",
          "Survey updated · Urban Nest",
          "Project due tomorrow · Aster Finance",
        ].map((x, i) => (
          <div className="flex items-center gap-4 p-5" key={x}>
            <span
              className={`h-3 w-3 rounded-full ${i === 3 ? "bg-ibraine-orange" : "bg-ibraine-blue"}`}
            />
            <div>
              <b className="text-sm">{x}</b>
              <p className="text-xs text-gray-400">{i + 1} hour ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
