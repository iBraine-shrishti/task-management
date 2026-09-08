import React from "react";
import PriorityManager from "../../components/projects/PriorityManager";
import ProjectsPipeline from "../../components/projects/ProjectsPipeline";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* 1ST PRIORITY MANAGER */}
      <PriorityManager />

      {/* 2ND PROJECT PIPELINE WITH GRID/LIST TOGGLE & ONGOING/COMPLETED/PENDING/DROPPED STAGES */}
      <ProjectsPipeline />
    </div>
  );
}
