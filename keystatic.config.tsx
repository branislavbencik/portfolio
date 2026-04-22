import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          description: "One-liner shown on the card.",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            description: "Up to 3 shown on the thumbnail. First tag styled as a pill if 'Case Study'.",
          }
        ),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Case Study", value: "case-study" },
            { label: "Selected Project", value: "selected" },
          ],
          defaultValue: "selected",
        }),
        metric: fields.text({
          label: "Metric",
          description: "Optional. Right-aligned on the card.",
          validation: { isRequired: false },
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images",
          publicPath: "/images",
        }),
        order: fields.integer({
          label: "Display Order",
          description: "1 = first on landing page",
        }),

        // --- Detail page fields ---

        company: fields.text({
          label: "Company / Product",
          description: "Short identifier shown in the landing card meta row (e.g. Skoala, TeaTime, NNspect).",
          validation: { isRequired: false },
        }),
        role: fields.text({
          label: "Role",
          description: "e.g. Lead Designer, Co-owner",
          validation: { isRequired: false },
        }),
        year: fields.text({
          label: "Year",
          description: "e.g. 2024–25 or 2022",
          validation: { isRequired: false },
        }),
        domain: fields.text({
          label: "Domain",
          description: "e.g. EdTech, Fintech, Industrial AI. Shown in the landing card metadata row.",
          validation: { isRequired: false },
        }),
        intro: fields.text({
          label: "Intro",
          description: "Opening paragraph on the detail page.",
          multiline: true,
          validation: { isRequired: false },
        }),

        // Case study specific — leave empty for selected projects
        contributions: fields.array(
          fields.text({ label: "Contribution" }),
          { label: "Contributions" }
        ),
        impactItems: fields.array(
          fields.object({
            value: fields.text({ label: "Value", description: "e.g. 3,5K" }),
            label: fields.text({ label: "Label", description: "e.g. Czech schools" }),
          }),
          { label: "Impact Items" }
        ),

        // Sections — unified for both types.
        // Case studies: multiple sections with label + title + description + images.
        // Selected projects: one or more sections with only images (leave label/title/description empty).
        sections: fields.array(
          fields.object({
            label: fields.text({
              label: "Section Label",
              description: "e.g. Key design decision",
              validation: { isRequired: false },
            }),
            title: fields.text({
              label: "Section Title",
              validation: { isRequired: false },
            }),
            description: fields.text({
              label: "Section Description",
              multiline: true,
              validation: { isRequired: false },
            }),
            images: fields.array(
              fields.object({
                src: fields.text({
                  label: "Image Path",
                  description: "e.g. /images/skoala/skoala-ws1-i1.png",
                }),
                alt: fields.text({ label: "Alt Text" }),
                caption: fields.text({
                  label: "Caption",
                  validation: { isRequired: false },
                }),
                background: fields.checkbox({ label: "Background", defaultValue: true }),
                paddingSides: fields.select({
                  label: "Padding Sides",
                  description: "Which sides get 32px padding. 'Default' follows Background (on = all sides, off = none).",
                  options: [
                    { label: "Default (from background)", value: "" },
                    { label: "All sides", value: "all" },
                    { label: "All except bottom", value: "no-bottom" },
                    { label: "Top + left only", value: "top-left" },
                    { label: "None", value: "none" },
                  ],
                  defaultValue: "",
                }),
                borderSides: fields.select({
                  label: "Border Sides",
                  description: "Which sides get a border. 'Default' follows Background (on = all sides, off = none).",
                  options: [
                    { label: "Default (from background)", value: "" },
                    { label: "All sides", value: "all" },
                    { label: "All except bottom", value: "no-bottom" },
                    { label: "None", value: "none" },
                  ],
                  defaultValue: "",
                }),
                width: fields.integer({
                  label: "Max Width (px)",
                  description: "Optional. Leave blank for full width.",
                  validation: { isRequired: false },
                }),
              }),
              { label: "Images" }
            ),
          }),
          { label: "Sections" }
        ),
      },
    }),
  },
});
