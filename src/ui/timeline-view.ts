import { ItemView, WorkspaceLeaf } from "obsidian";

import { viewTypeTimeline } from "../constants";
import type { ObsidianFacade } from "../service/obsidian-facade";
import type { PlanEditor } from "../service/plan-editor";
import type { DayPlannerSettings } from "../settings";

import Timeline from "./components/timeline.svelte";

export default class TimelineView extends ItemView {
  private timeline: Timeline;

  constructor(
    leaf: WorkspaceLeaf,
    private readonly settings: DayPlannerSettings,
    private readonly obsidianFacade: ObsidianFacade,
    private readonly planEditor: PlanEditor,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return viewTypeTimeline;
  }

  getDisplayText(): string {
    return "Day Planner Timeline";
  }

  getIcon() {
    return this.settings.timelineIcon;
  }

  async onOpen() {
    const contentEl = this.containerEl.children[1];
    this.timeline = new Timeline({
      target: contentEl,
      props: {
        obsidianFacade: this.obsidianFacade,
        onUpdate: this.planEditor.syncTasksWithFile,
      },
    });
  }

  async onClose() {
    this.timeline?.$destroy();
  }
}
