import React, { useRef, useState } from "react";
import {
  Folder,
  Pencil,
  Trash2,
  Upload,
  Download,
  Copy,
  CheckCircle2,
  Move,
  Check,
} from "lucide-react";

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
  onMoveFolder,
  isSelected,
  onToggleSelect,
  onCopyFolder,
}) {
  const fileInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const getFolderTheme = (type) => {
    switch (type) {
      case "BY_CLIENT":
        return { iconColor: "text-emerald-500 fill-emerald-400" };
      case "FOR_CLIENT":
        return { iconColor: "text-indigo-500 fill-indigo-400" };
      default:
        return { iconColor: "text-sky-500 fill-sky-400" };
    }
  };

  const theme = getFolderTheme(folder.type);

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;
    const count = files.length;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
    if (onTriggerToast) {
      onTriggerToast(`${count} file(s) uploaded into "${folder.name}"`);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "DRIVE_FOLDER", id: folder.id }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const rawData = e.dataTransfer.getData("application/json");

    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed.type === "DRIVE_FOLDER" && parsed.id !== folder.id) {
          onMoveFolder(parsed.id, folder.id);
          return;
        }
      } catch (err) {}
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <div
      draggable={!folder.isSystem}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onNavigate(folder.id)}
      className={`group relative flex flex-col items-center justify-start p-3 rounded-xl transition-all duration-150 select-none cursor-pointer ${
        isSelected
          ? "bg-blue-100/80 ring-2 ring-blue-500"
          : isDragOver
            ? "bg-blue-200 ring-2 ring-blue-600 scale-105"
            : "hover:bg-slate-200/60"
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          handleFileUpload(e.target.files);
          e.target.value = "";
        }}
        multiple
        className="hidden"
      />

      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(folder.id);
        }}
        className={`absolute top-2 left-2 z-20 flex items-center justify-center w-5 h-5 rounded-md border transition-all ${
          isSelected
            ? "bg-blue-600 border-blue-600 text-white opacity-100"
            : "border-slate-300 bg-white/90 opacity-0 group-hover:opacity-100 hover:border-blue-500"
        }`}
        title="Select Folder"
      >
        {isSelected && <Check size={12} strokeWidth={3} />}
      </div>

      <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-200/90 shadow-md z-20">
        {!isReadOnly && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1 px-2 py-1 hover:bg-slate-100 text-slate-700 hover:text-blue-600 rounded-md transition text-[11px] font-semibold"
            title="Upload Files"
          >
            <Upload size={13} />
            <span>Upload</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onTriggerToast) {
              onTriggerToast(`Downloading "${folder.name}.zip"...`);
            }
          }}
          className="p-1 hover:bg-slate-100 text-slate-700 hover:text-emerald-600 rounded-md transition"
          title="Download Folder"
        >
          <Download size={13} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopyFolder(folder);
          }}
          className="p-1 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 rounded-md transition"
          title="Copy Folder"
        >
          <Copy size={13} />
        </button>

        {!folder.isSystem && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingFolderId(folder.id);
                setEditFolderName(folder.name);
              }}
              className="p-1 hover:bg-slate-100 text-slate-700 hover:text-blue-600 rounded-md transition"
              title="Rename Folder"
            >
              <Pencil size={13} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(folder.id, folder.isSystem);
              }}
              className="p-1 hover:bg-slate-100 text-slate-700 hover:text-red-600 rounded-md transition"
              title="Delete Folder"
            >
              <Trash2 size={13} />
            </button>
          </>
        )}
      </div>

      {!folder.isSystem && !isSelected && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
          <Move size={12} className="text-slate-400" />
        </div>
      )}

      <div className="relative my-1 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-150">
        <Folder
          size={96}
          className={`${theme.iconColor} stroke-[1.2] drop-shadow-md`}
        />

        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/90 text-white rounded-xl backdrop-blur-xs">
            <CheckCircle2 size={28} />
          </div>
        )}
      </div>

      {/* FULL NAME DISPLAY (NO TRUNCATION) */}
      <div className="w-full text-center mt-1 px-1">
        {editingFolderId === folder.id ? (
          <input
            type="text"
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
            onBlur={() => onRename(folder.id)}
            onKeyDown={(e) => e.key === "Enter" && onRename(folder.id)}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-center font-medium bg-white border border-blue-500 rounded px-1.5 py-0.5 w-full focus:outline-none shadow-xs"
          />
        ) : (
          <p
            className="text-xs font-semibold text-slate-800 tracking-tight leading-normal break-words group-hover:text-blue-600 transition"
            title={folder.name}
          >
            {folder.name}
          </p>
        )}
      </div>
    </div>
  );
}
