import { h } from "vue";
import {
IconApps,
IconArrowNarrowDown,
IconArrowNarrowUp,
IconBrandPaypal,
IconReportAnalytics
} from "@tabler/icons-vue";

export const counterItems = [
{
icon: h(IconApps, { size: 28 }),
iconClass: "ti ti-apps",
value: 500,
prefix: "$",
description: "Respected Companies",
tag: "p"
},
{
icon: h(IconReportAnalytics, { size: 28 }),
iconClass: "ti ti-report-analytics",
value: 75,
description: "Analytical Reports",
tag: "div"
},
{
icon: h(IconBrandPaypal, { size: 28 }),
iconClass: "ti ti-brand-paypal",
value: 40,
suffix: "%",
description: "Protected Payments",
tag: "p"
}
];

export const tabData = [
{
id: "1",
items: [
{ value: 150, label: "Income", icon: h(IconArrowNarrowUp, { class: "text-success" }), prefix: "$" },
{ value: 85, label: "Projects", icon: h(IconArrowNarrowDown, { class: "text-danger" }), suffix: "%" },
{ value: 150, label: "Achievement", icon: h(IconArrowNarrowUp, { class: "text-success" }), suffix: "%" }
]
},
{
id: "2",
items: [
{ value: 110, label: "Income", icon: h(IconArrowNarrowUp, { class: "text-success" }), prefix: "$" },
{ value: 65, label: "Projects", icon: h(IconArrowNarrowDown, { class: "text-danger" }), suffix: "%" },
{ value: 3200, label: "Achievement", icon: h(IconArrowNarrowUp, { class: "text-success" }), suffix: "%" }
]
},
{
id: "3",
items: [
{ value: 100, label: "Income", icon: h(IconArrowNarrowUp, { class: "text-success" }), prefix: "$" },
{ value: 70, label: "Projects", icon: h(IconArrowNarrowDown, { class: "text-danger" }), suffix: "%" },
{ value: 1200, label: "Achievement", icon: h(IconArrowNarrowUp, { class: "text-success" }), suffix: "%" }
]
}
];

export const simpleCounterItems = [
{ prefix: "$", value: 150, suffix: "", icon: h(IconArrowNarrowUp, { size: 24, class: "text-success" }), label: "Income" },
{ prefix: "", value: 85, suffix: "", icon: h(IconArrowNarrowDown, { size: 24, class: "text-danger" }), label: "Projects" },
{ prefix: "", value: 60, suffix: "%", icon: h(IconArrowNarrowUp, { size: 24, class: "text-success" }), label: "Achievement" }
];

export const updateCounterItems = [
{ value: 200, prefix: "$", iconClass: "ti ti-arrow-narrow-up", iconColorClass: "text-success", label: "Income" },
{ value: 81, iconClass: "ti ti-arrow-narrow-down", iconColorClass: "text-danger", label: "Projects" },
{ value: 60, suffix: "%", iconClass: "ti ti-arrow-narrow-up", iconColorClass: "text-success", label: "Achievement" }
];
