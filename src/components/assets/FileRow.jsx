import React from "react";
import { File, Download, Trash2 } from "lucide-react";

export default function FileRow({ file, isReadOnly, onDeleteFile }) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
          <File size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">{file.name}</p>
          <p className="text-[10px] text-slate-400">
            {file.size} • Uploaded {file.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => alert(`Simulating download for: ${file.name}`)}
          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition"
          title="Download File"
        >
          <Download size={15} />
        </button>
        {!isReadOnly && (
          <button
            onClick={() => onDeleteFile(file.id)}
            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-red-600 rounded-lg transition"
            title="Delete File"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
