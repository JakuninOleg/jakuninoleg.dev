import assert from "node:assert/strict";
import test from "node:test";
import { calculateEstimate, projects } from "../src/content/project-estimator.ts";

const answers = (kind, overrides = {}) => ({ kind, start: "new", scope: "base", features: [], cms: "none", materials: "ready", ...overrides });

test("public starting prices and timelines stay aligned with the calculator", () => {
  assert.equal(calculateEstimate(answers("landing")).minimum, 11900);
  assert.deepEqual(calculateEstimate(answers("landing")).days, [1, 10]);
  assert.equal(calculateEstimate(answers("catalog")).minimum, 29000);
  assert.equal(calculateEstimate(answers("store")).minimum, 49000);
  assert.deepEqual(calculateEstimate(answers("corporate")).days, [10, 30]);
});

test("each project has three distinct scopes and its own feature set", () => {
  for (const project of projects) {
    assert.equal(project.scopes.length, 3, project.id);
    assert.equal(new Set(project.scopes.map((item) => item.id)).size, 3, project.id);
    assert.ok(project.features.length >= 3, project.id);
  }
});

test("selected features and unknown source increase the range", () => {
  const base = calculateEstimate(answers("store"));
  const complex = calculateEstimate(answers("store", { start: "no-source", scope: "expanded", features: ["payment", "delivery"] }));
  assert.equal(complex.minimum, base.minimum + 6000 + 20000 + 9000 + 10000);
  assert.ok(complex.days[1] > base.days[1]);
});

test("included administration is never billed as optional CMS", () => {
  const base = calculateEstimate(answers("catalog"));
  const advanced = calculateEstimate(answers("catalog", { cms: "advanced" }));
  assert.equal(advanced.minimum, base.minimum);
});

test("a feature from another project cannot affect the quote", () => {
  const base = calculateEstimate(answers("landing"));
  const unrelated = calculateEstimate(answers("landing", { features: ["payment"] }));
  assert.equal(unrelated.minimum, base.minimum);
});
