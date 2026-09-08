export default function Assets() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ibraine-blue">Workspace</p>
        <h1 className="mt-1 text-3xl font-extrabold">Asset Management</h1>
      </div>
      <div className="card p-10 text-center">
        <div className="mx-auto max-w-lg rounded-2xl border-2 border-dashed border-blue-200 bg-ibraine-sky p-12">
          <b className="text-lg">Drop assets here</b>
          <p className="mt-2 text-sm text-gray-500">
            PDF, PSD, AI, FIG, SVG, PNG, JPG, ZIP, DOCX, XLSX, CSV, MP4 and
            more.
          </p>
          <button className="btn btn-primary mt-5">Upload assets</button>
        </div>
      </div>
    </div>
  );
}
