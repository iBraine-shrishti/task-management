import { CheckCircle2, Clock3, Link2, MessageSquare } from "lucide-react";
export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ibraine-blue">My Workspace</p>
        <h1 className="mt-1 text-3xl font-extrabold">Employee Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your assignments, survey updates and project shortcuts.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Today", "6 tasks"],
          ["Ongoing", "4 projects"],
          ["Review", "2 tasks"],
          ["Due Soon", "3 tasks"],
        ].map(([a, b], i) => (
          <div className="card p-5" key={a}>
            <p className="text-sm text-gray-500">{a}</p>
            <b className="mt-1 block text-2xl">{b}</b>
            <div
              className={`mt-4 h-1.5 rounded-full ${["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-orange-400"][i]}`}
            />
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_.8fr]">
        <section className="card p-5">
          <div className="flex justify-between">
            <div>
              <h2 className="section-title">Today's Tasks</h2>
              <p className="muted mt-1 text-xs">Only tasks assigned to you</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              "Homepage hero revisions",
              "Instagram campaign creatives",
              "SEO keyword mapping",
              "Google Ads copy review",
              "Client asset cleanup",
            ].map((x, i) => (
              <div
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                key={x}
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-ibraine-sky text-ibraine-blue">
                  <CheckCircle2 size={17} />
                </div>
                <div className="flex-1">
                  <b className="text-sm">{x}</b>
                  <p className="text-xs text-gray-400">
                    {
                      [
                        "Nova Foods",
                        "Nova Foods",
                        "Urban Nest",
                        "Aster Finance",
                        "Bloom Studio",
                      ][i]
                    }
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  <Clock3 size={13} className="mr-1 inline" />
                  {i + 1}d
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-5">
          <h2 className="section-title">Survey Updates</h2>
          <p className="muted mt-1 text-xs">Changes you need to know</p>
          <div className="mt-5 space-y-4">
            {[
              ["Tone", "Professional → Friendly"],
              ["Target Audience", "25–34 → 18–34"],
              ["Platform", "Instagram added"],
            ].map(([a, b]) => (
              <div className="rounded-xl bg-orange-50 p-4" key={a}>
                <b className="text-sm">{a}</b>
                <p className="mt-1 text-xs text-gray-600">{b}</p>
              </div>
            ))}
          </div>
          <button className="btn btn-soft mt-4 w-full">
            <MessageSquare size={15} /> View updates
          </button>
        </section>
      </div>
      <section className="card p-5">
        <div className="flex items-center gap-2">
          <Link2 className="text-ibraine-orange" size={19} />
          <h2 className="section-title">Project Platform Shortcuts</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {[
            "Canva",
            "Meta",
            "Instagram",
            "Google Ads",
            "Analytics",
            "Pinterest",
            "WordPress",
            "Drive",
          ].map((x) => (
            <button
              className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm font-semibold hover:border-blue-200 hover:bg-ibraine-sky"
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
