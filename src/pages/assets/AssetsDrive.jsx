import React, { useState, useRef } from "react";
import { FolderPlus, Upload, Lock, ArrowLeft } from "lucide-react";
import { initialDriveData } from "../../data/initialDriveData.js";
import Breadcrumbs from "../../components/assets/Breadcrumbs.jsx";
import FolderCard from "../../components/assets/FolderCard.jsx";
import FileRow from "../../components/assets/FileRow.jsx";
import CreateFolderModal from "../../components/assets/CreateFolderModal.jsx";

export default function AssetsDrive({ userRole = "ADMIN" }) {
  const [tree, setTree] = useState(initialDriveData);
  const [path, setPath] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editFolderName, setEditFolderName] = useState("");

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const mainFileInputRef = useRef(null);

  // Helper to trigger temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Get Current Folder
  const getCurrentFolder = () => {
    if (path.length === 0)
      return { id: "ROOT", name: "Assets Drive", children: tree };
    let current = { children: tree };
    for (const id of path) {
      current = current.children?.find((item) => item.id === id);
      if (!current) break;
    }
    return current || { name: "Unknown", children: [] };
  };

  const currentFolder = getCurrentFolder();

  // Helper for Tree Updates
  const updateTreeAtFolder = (folderId, updateFn) => {
    const updateRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === folderId) {
          return updateFn(node);
        }
        if (node.children && node.children.length > 0) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    setTree((prev) => updateRecursive(prev));
  };

  // Header Upload function (Uploads into the current active directory)
  const handleCurrentFolderUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const count = files.length;
    const folderName = currentFolder.name;
    const msg = `${count} file${count > 1 ? "s" : ""} uploaded to "${folderName}"`;

    triggerToast(msg);
    e.target.value = "";
  };

  // Create Subfolder
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolderNode = {
      id: `f-${Date.now()}`,
      name: newFolderName.trim(),
      type: "CUSTOM",
      isSystem: false,
      children: [],
    };

    if (path.length === 0) {
      setTree((prev) => [...prev, newFolderNode]);
    } else {
      updateTreeAtFolder(currentFolder.id, (parent) => ({
        ...parent,
        children: [...(parent.children || []), newFolderNode],
      }));
    }

    setNewFolderName("");
    setIsCreateModalOpen(false);
  };

  // Rename Folder
  const handleRenameFolder = (folderId) => {
    if (!editFolderName.trim()) return;
    updateTreeAtFolder(folderId, (folder) => ({
      ...folder,
      name: editFolderName.trim(),
    }));
    setEditingFolderId(null);
    setEditFolderName("");
  };

  // Delete Folder
  const handleDeleteFolder = (folderId, isSystem) => {
    if (isSystem) {
      alert("System directories cannot be deleted.");
      return;
    }
    if (!confirm("Delete this folder and all subfolders?")) return;

    const deleteRecursive = (nodes) => {
      return nodes
        .filter((node) => node.id !== folderId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteRecursive(node.children) : [],
        }));
    };

    setTree((prev) => deleteRecursive(prev));
  };

  // Navigation
  const navigateToFolder = (folderId) => setPath([...path, folderId]);
  const navigateUp = () => setPath(path.slice(0, -1));
  const navigateToBreadcrumb = (index) => {
    setPath(index === -1 ? [] : path.slice(0, index + 1));
  };

  const isReadOnly =
    userRole === "CLIENT" && currentFolder?.type === "FOR_CLIENT";

  return (
    <div className="relative flex flex-col h-full bg-slate-50 text-slate-800 p-6 min-h-screen">
      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg font-medium text-xs animate-slide-up transition-all">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          {path.length > 0 && (
            <button
              onClick={navigateUp}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition shadow-sm cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          )}

          {!isReadOnly && path.length > 0 && (
            <>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition shadow-sm cursor-pointer"
              >
                <FolderPlus size={15} className="text-blue-600" />
                <span>New Folder</span>
              </button>

              {/* Upload to Current Folder Button */}
              <button
                onClick={() => mainFileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                <Upload size={15} />
                <span>Upload to Current Folder</span>
              </button>

              <input
                type="file"
                ref={mainFileInputRef}
                onChange={handleCurrentFolderUpload}
                multiple
                className="hidden"
              />
            </>
          )}

          {isReadOnly && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold">
              <Lock size={14} />
              <span>Read-Only Folder</span>
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs Trail */}
      <Breadcrumbs
        tree={tree}
        path={path}
        onNavigateBreadcrumb={navigateToBreadcrumb}
      />

      {/* Folders Grid Section */}
      <div className="flex-1 mt-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Folders ({currentFolder.children?.length || 0})
        </h2>

        {currentFolder.children && currentFolder.children.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {currentFolder.children.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onNavigate={navigateToFolder}
                editingFolderId={editingFolderId}
                editFolderName={editFolderName}
                setEditFolderName={setEditFolderName}
                setEditingFolderId={setEditingFolderId}
                onRename={handleRenameFolder}
                onDelete={handleDeleteFolder}
                isReadOnly={isReadOnly}
                onTriggerToast={triggerToast}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white/50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
            No subdirectories in this location.
          </div>
        )}
      </div>

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateFolder}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
      />
    </div>
  );
}
