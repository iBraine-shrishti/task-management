import React, { useState, useRef } from "react";
import {
  FolderPlus,
  Upload,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Compass,
  CheckSquare,
  X,
  Trash2,
  Download,
  Copy,
  ClipboardCheck,
} from "lucide-react";
import { initialDriveData } from "../../data/initialDriveData.js";
import Breadcrumbs from "../../components/assets/Breadcrumbs.jsx";
import FolderCard from "../../components/assets/FolderCard.jsx";
import CreateFolderModal from "../../components/assets/CreateFolderModal.jsx";

export default function AssetsDrive({ userRole = "ADMIN" }) {
  const [tree, setTree] = useState(initialDriveData);
  const [path, setPath] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isWorkspaceDragOver, setIsWorkspaceDragOver] = useState(false);

  const [selectedFolderIds, setSelectedFolderIds] = useState([]);
  const [copiedFolders, setCopiedFolders] = useState([]);

  const mainFileInputRef = useRef(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getCurrentFolder = () => {
    if (path.length === 0) return { id: "ROOT", name: "ROOT", children: tree };
    let current = { children: tree };
    for (const id of path) {
      current = current.children?.find((item) => item.id === id);
      if (!current) break;
    }
    return current || { name: "Unknown", children: [] };
  };

  const currentFolder = getCurrentFolder();

  const handleToggleSelect = (folderId) => {
    setSelectedFolderIds((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId],
    );
  };

  const handleSelectAll = () => {
    if (!currentFolder.children) return;
    const allCurrentIds = currentFolder.children.map((f) => f.id);
    if (selectedFolderIds.length === allCurrentIds.length) {
      setSelectedFolderIds([]);
    } else {
      setSelectedFolderIds(allCurrentIds);
    }
  };

  const handleClearSelection = () => setSelectedFolderIds([]);

  const handleCopySingle = (folder) => {
    setCopiedFolders([folder]);
    triggerToast(
      `Copied "${folder.name}". Navigate to destination and click Paste.`,
    );
  };

  const handleBatchCopy = () => {
    if (!currentFolder.children) return;
    const selectedObjList = currentFolder.children.filter((f) =>
      selectedFolderIds.includes(f.id),
    );
    setCopiedFolders(selectedObjList);
    triggerToast(`Copied ${selectedObjList.length} folder(s). Ready to paste.`);
    setSelectedFolderIds([]);
  };

  const handlePaste = () => {
    if (copiedFolders.length === 0) return;

    const cloneFolderDeep = (folderNode) => {
      return {
        ...folderNode,
        id: `f-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: `${folderNode.name} (Copy)`,
        children: folderNode.children
          ? folderNode.children.map(cloneFolderDeep)
          : [],
      };
    };

    const newCopies = copiedFolders.map(cloneFolderDeep);

    if (path.length === 0) {
      setTree((prev) => [...prev, ...newCopies]);
    } else {
      updateTreeAtFolder(currentFolder.id, (parent) => ({
        ...parent,
        children: [...(parent.children || []), ...newCopies],
      }));
    }

    triggerToast(
      `Pasted ${copiedFolders.length} folder(s) into "${currentFolder.name}"`,
    );
    setCopiedFolders([]);
  };

  const getAllFoldersFlattened = (nodes = tree, prefix = "") => {
    let list = [];
    for (const node of nodes) {
      const fullPath = prefix ? `${prefix} / ${node.name}` : node.name;
      list.push({ id: node.id, name: fullPath, original: node });
      if (node.children && node.children.length > 0) {
        list = list.concat(getAllFoldersFlattened(node.children, fullPath));
      }
    }
    return list;
  };

  const findPathToNode = (nodes, targetId, currentPath = []) => {
    for (const node of nodes) {
      if (node.id === targetId) return [...currentPath, node.id];
      if (node.children) {
        const found = findPathToNode(node.children, targetId, [
          ...currentPath,
          node.id,
        ]);
        if (found) return found;
      }
    }
    return null;
  };

  const handleQuickJump = (e) => {
    const selectedId = e.target.value;
    setSelectedFolderIds([]);
    if (selectedId === "ROOT") {
      setPath([]);
      return;
    }
    const foundPath = findPathToNode(tree, selectedId);
    if (foundPath) setPath(foundPath);
  };

  const updateTreeAtFolder = (folderId, updateFn) => {
    const updateRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === folderId) return updateFn(node);
        if (node.children && node.children.length > 0) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    setTree((prev) => updateRecursive(prev));
  };

  // Drag & drop logic to move items anywhere (Root or nested folder)
  const handleMoveFolder = (sourceFolderId, targetFolderId) => {
    if (sourceFolderId === targetFolderId) return;

    let folderToMove = null;

    const removeRecursive = (nodes) => {
      return nodes.filter((node) => {
        if (node.id === sourceFolderId) {
          folderToMove = node;
          return false;
        }
        if (node.children) {
          node.children = removeRecursive(node.children);
        }
        return true;
      });
    };

    const newTree = removeRecursive(JSON.parse(JSON.stringify(tree)));
    if (!folderToMove) return;

    if (targetFolderId === "ROOT") {
      setTree([...newTree, folderToMove]);
      triggerToast(`Moved folder to "ROOT"`);
      return;
    }

    const targetFolderObj = getAllFoldersFlattened().find(
      (f) => f.id === targetFolderId,
    )?.original;

    const insertRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === targetFolderId) {
          return {
            ...node,
            children: [...(node.children || []), folderToMove],
          };
        }
        if (node.children) {
          return { ...node, children: insertRecursive(node.children) };
        }
        return node;
      });
    };

    setTree(insertRecursive(newTree));
    triggerToast(
      `Moved folder into "${targetFolderObj?.name || "destination"}"`,
    );
  };

  const handleWorkspaceDrop = (e) => {
    e.preventDefault();
    setIsWorkspaceDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const count = e.dataTransfer.files.length;
      triggerToast(`${count} file(s) uploaded to "${currentFolder.name}"`);
    }
  };

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

  const handleRenameFolder = (folderId) => {
    if (!editFolderName.trim()) return;
    updateTreeAtFolder(folderId, (folder) => ({
      ...folder,
      name: editFolderName.trim(),
    }));
    setEditingFolderId(null);
    setEditFolderName("");
  };

  const handleDeleteFolder = (folderId, isSystem) => {
    if (isSystem) return alert("System directories cannot be deleted.");
    if (!confirm("Delete this folder and all subfolders?")) return;

    const deleteRecursive = (nodes) =>
      nodes
        .filter((node) => node.id !== folderId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteRecursive(node.children) : [],
        }));

    setTree((prev) => deleteRecursive(prev));
  };

  const handleBatchDelete = () => {
    if (selectedFolderIds.length === 0) return;
    if (!confirm(`Delete ${selectedFolderIds.length} selected folder(s)?`))
      return;

    const deleteRecursive = (nodes) =>
      nodes
        .filter((node) => !selectedFolderIds.includes(node.id))
        .map((node) => ({
          ...node,
          children: node.children ? deleteRecursive(node.children) : [],
        }));

    setTree((prev) => deleteRecursive(prev));
    triggerToast(`Deleted ${selectedFolderIds.length} folder(s)`);
    setSelectedFolderIds([]);
  };

  const navigateToFolder = (folderId) => {
    setSelectedFolderIds([]);
    setPath([...path, folderId]);
  };

  const navigateUp = () => {
    setSelectedFolderIds([]);
    setPath(path.slice(0, -1));
  };

  const handleNavigateBreadcrumb = (index) => {
    setSelectedFolderIds([]);
    if (index === -1) {
      setPath([]);
    } else {
      setPath(path.slice(0, index + 1));
    }
  };

  const isReadOnly =
    userRole === "CLIENT" && currentFolder?.type === "FOR_CLIENT";
  const allFlattenedFolders = getAllFoldersFlattened();

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!isWorkspaceDragOver) setIsWorkspaceDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsWorkspaceDragOver(false);
      }}
      onDrop={handleWorkspaceDrop}
      className={`relative flex flex-col h-full bg-slate-50 text-slate-800 p-6 min-h-screen transition-colors ${
        isWorkspaceDragOver
          ? "bg-blue-50/80 border-2 border-dashed border-blue-400"
          : ""
      }`}
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl font-medium text-xs animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {copiedFolders.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-blue-900 text-white rounded-2xl shadow-2xl border border-blue-700">
          <ClipboardCheck size={18} className="text-emerald-400" />
          <span className="text-xs font-medium">
            {copiedFolders.length} folder(s) in Clipboard
          </span>
          <button
            onClick={handlePaste}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
          >
            Paste Here ({currentFolder.name})
          </button>
          <button
            onClick={() => setCopiedFolders([])}
            className="p-1 hover:bg-blue-800 rounded-md text-slate-300"
            title="Cancel Copy"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Controls & Breadcrumbs Bar */}
      <div className="flex flex-col gap-3 pb-4 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {path.length > 0 && (
              <button
                onClick={navigateUp}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition shadow-xs"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            )}

            {!isReadOnly && (
              <>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition shadow-xs cursor-pointer"
                >
                  <FolderPlus size={15} className="text-blue-600" />
                  <span>New Folder</span>
                </button>

                <button
                  onClick={() => mainFileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow-xs cursor-pointer"
                >
                  <Upload size={15} />
                  <span>Upload</span>
                </button>

                <input
                  type="file"
                  ref={mainFileInputRef}
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      triggerToast(
                        `${e.target.files.length} file(s) uploaded into "${currentFolder.name}"`,
                      );
                    }
                    e.target.value = "";
                  }}
                  multiple
                  className="hidden"
                />
              </>
            )}

            {isReadOnly && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold">
                <Lock size={14} />
                <span>Read-Only Directory</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs w-full lg:w-auto">
            <Compass size={15} className="text-blue-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-500 shrink-0">
              Quick Path:
            </span>
            <select
              value={currentFolder.id}
              onChange={handleQuickJump}
              className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer w-full"
            >
              <option value="ROOT">ROOT (Assets Drive)</option>
              {allFlattenedFolders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Header Path with Drop Support */}
        <div className="pt-2">
          <Breadcrumbs
            tree={tree}
            path={path}
            onNavigateBreadcrumb={handleNavigateBreadcrumb}
            onMoveFolder={handleMoveFolder}
          />
        </div>
      </div>

      {selectedFolderIds.length > 0 && (
        <div className="mt-4 flex items-center justify-between p-3 bg-blue-900 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearSelection}
              className="p-1 hover:bg-blue-800 rounded-md transition"
            >
              <X size={16} />
            </button>
            <span className="text-xs font-semibold">
              {selectedFolderIds.length} folder(s) selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <CheckSquare size={13} />
              <span>
                {selectedFolderIds.length ===
                (currentFolder.children?.length || 0)
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </button>

            <button
              onClick={handleBatchCopy}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <Copy size={13} />
              <span>Copy Selected</span>
            </button>

            <button
              onClick={() =>
                triggerToast(
                  `Downloading ${selectedFolderIds.length} folder(s)...`,
                )
              }
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <Download size={13} />
              <span>Download</span>
            </button>

            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid View */}
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
                onMoveFolder={handleMoveFolder}
                isSelected={selectedFolderIds.includes(folder.id)}
                onToggleSelect={handleToggleSelect}
                onCopyFolder={handleCopySingle}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white/50 border border-dashed border-slate-300 rounded-2xl text-center text-slate-400 text-xs">
            Drag files from your computer or drop folders onto header paths to
            move them.
          </div>
        )}
      </div>

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
