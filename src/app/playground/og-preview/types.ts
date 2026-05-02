export type Route = "root" | "project";

export type ProjectData = {
  slug: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  role: string;
  year: string;
  coverImage: string;
};

export type VariantId = "V0" | "V1" | "V2" | "V3";

export type VariantProps = {
  route: Route;
  project: ProjectData;
};
