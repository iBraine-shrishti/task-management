import React, { useRef, useState } from "react";
import { Folder, Pencil, Trash2, Upload, CheckCircle2 } from "lucide-react";

export default function FolderCard({
  folder,
  onNavigate,
  editingFolderId,
  editFolderName,
  setEditFolderName,
  setEditingFolderId,
  onRename,
  onDelete,
  isReadOnly,
  onTriggerToast,
}) {
  const fileInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // macOS folder theme styling
  const getFolderTheme = (type) => {
    switch (type) {
      case "BY_CLIENT":
        return {
          iconColor: "text-emerald-500 fill-emerald-400",
        };
      case "FOR_CLIENT":
        return {
          iconColor: "text-indigo-500 fill-indigo-400",
        };
      default:
        return {
          iconColor: "text-sky-500 fill-sky-400", // macOS Classic Blue
        };
    }
  };

  const theme = getFolderTheme(folder.type);

  const handleCardUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const count = files.length;
    const msg = `${count} file${count > 1 ? "s" : ""} uploaded to "${folder.name}"`;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);

    if (onTriggerToast) onTriggerToast(msg);
    e.target.value = "";
  };

  return (
    <div className="group relative flex flex-col items-center justify-start p-3 rounded-xl hover:bg-slate-200/60 transition-all duration-150 select-none cursor-pointer">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCardUpload}
        multiple
        className="hidden"
      />

      {/* Floating Action Menu on Hover */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-slate-200/80 shadow-sm z-10">
        {!isReadOnly && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-md transition"
            title="Upload to folder"
          >
            <Upload size={13} />
          </button>
        )}
        {!folder.isSystem && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingFolderId(folder.id);
                setEditFolderName(folder.name);
              }}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-md transition"
              title="Rename folder"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(folder.id, folder.isSystem);
              }}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-red-600 rounded-md transition"
              title="Delete folder"
            >
              <Trash2 size={13} />
            </button>
          </>
        )}
      </div>

      {/* BIG MAC-STYLE FOLDER ICON */}
      <div
        onClick={() => onNavigate(folder.id)}
        className="relative my-1 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-150"
      >
        <Folder
          size={100}
          className={`${theme.iconColor} stroke-[1.2] drop-shadow-md`}
        />

        {/* Temporary Upload Toast Indicator */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/90 text-white rounded-xl backdrop-blur-xs animate-fade-in">
            <CheckCircle2 size={28} />
          </div>
        )}
      </div>

      {/* FOLDER NAME (macOS Finder Centered Label) */}
      <div className="w-full text-center mt-1 px-1">
        {editingFolderId === folder.id ? (
          <input
            type="text"
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
            onBlur={() => onRename(folder.id)}
            onKeyDown={(e) => e.key === "Enter" && onRename(folder.id)}
            autoFocus
            className="text-xs text-center font-medium bg-white border border-blue-500 rounded px-1.5 py-0.5 w-full focus:outline-none shadow-xs"
          />
        ) : (
          <p
            onClick={() => onNavigate(folder.id)}
            className="text-xs font-semibold text-slate-800 tracking-tight leading-tight line-clamp-2 group-hover:text-blue-600 transition"
            title={folder.name}
          >
            {folder.name}
          </p>
        )}
      </div>
    </div>
  );
}
