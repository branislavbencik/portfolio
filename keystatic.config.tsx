import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "One field shown both as the H1 on the detail page AND after the em-dash on the landing card (e.g. 'Designing CMS for financial literacy platform'). One source of truth — eliminates drift between card and detail.",
          },
        }),
        company: fields.text({
          label: "Company",
          description: "Brand name shown bold before the em dash on landing cards (e.g. 'Skoala').",
          validation: { isRequired: false },
        }),
        description: fields.text({
          label: "Description",
          description: "One-liner used as fallback when title isn't available.",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            description: "2–3 tags shown below the headline on landing cards. Order = importance. Outcome/impact first when applicable.",
          }
        ),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Case Study", value: "case-study" },
            { label: "Playground", value: "playground" },
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
        deliverables: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
              description: "e.g. skoala.cz, n8n workflow",
            }),
            href: fields.text({
              label: "URL",
              description: "Full URL including https://. Leave empty when disabled (NDA-locked).",
              validation: { isRequired: false },
            }),
            caption: fields.text({
              label: "Caption",
              description: "Optional secondary line below the label.",
              validation: { isRequired: false },
            }),
            disabled: fields.checkbox({
              label: "Disabled (NDA-locked)",
              description: "Render as a non-interactive button with an NDA + lock annotation. Use for artifacts that can't be linked publicly.",
              defaultValue: false,
            }),
          }),
          {
            label: "Deliverables",
            description: "Live products and process artifacts. Renders below the Impact Bar on case studies. Leave empty for selected projects.",
          }
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
                variant: fields.select({
                  label: "Variant",
                  description: "Image (default) renders full-width with frame controls. Logo renders constrained-height, centered, no lightbox; adjacent logos group into a single row.",
                  options: [
                    { label: "Image (default)", value: "image" },
                    { label: "Logo", value: "logo" },
                  ],
                  defaultValue: "image",
                }),
                background: fields.checkbox({ label: "Background", defaultValue: true }),
                backgroundShade: fields.select({
                  label: "Background Shade",
                  description: "Shade of the framed surface when Background is on. '1' is the default subtle off-white (#F4F4F5). 'Pure white' (#FFFFFF) is for images whose own background reads as grey/dark and need an explicit white frame. These are the only two allowed shades.",
                  options: [
                    { label: "1 — Subtle off-white (default, #F4F4F5)", value: "1" },
                    { label: "Pure white (#FFFFFF)", value: "white" },
                  ],
                  defaultValue: "1",
                }),
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
                cornerRadius: fields.select({
                  label: "Corner Radius",
                  description: "Optional. Adds a corner radius when there's no border. Useful for images with a baked-in background. Ignored when a border is set, because the border already carries a matching radius.",
                  options: [
                    { label: "None", value: "" },
                    { label: "Small", value: "sm" },
                    { label: "Medium", value: "md" },
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
            awards: fields.array(
              fields.object({
                logo: fields.text({
                  label: "Logo Path",
                  description: "e.g. /images/skoala/skoala-award-eifle.png. Leave empty to render the row text-only.",
                  validation: { isRequired: false },
                }),
                name: fields.text({ label: "Name" }),
                description: fields.text({
                  label: "Description",
                  validation: { isRequired: false },
                }),
              }),
              {
                label: "Awards",
                description: "Rendered as a vertical list of bordered rows inside the section, after the description. Use for award/recognition lists.",
              }
            ),
          }),
          { label: "Sections" }
        ),
      },
    }),
  },
});
