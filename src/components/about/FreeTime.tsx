import BentoBlock from "./BentoBlock";

const items = [
  {
    icon: "🍤",
    label: "Cooking",
    text: "Quite geeky about picking the best recipe. Try carbonara with the original ingredients.",
    href: "https://www.recipesfromitaly.com/spaghetti-carbonara-original-recipe/",
    linkLabel: "Recipe",
  },
  {
    icon: "🔊",
    label: "Music",
    text: "Obsessed about finding & mixing music that moves not only your body but also your soul. Try Merak Part I.",
    href: "https://soundcloud.com/branislavbencik",
    linkLabel: "Listen",
  },
  {
    icon: "🤡",
    label: "Circus",
    text: "I visit CIRQUEON, a circus school for amateurs, to move and play.",
    href: "https://cirqueon.cz/",
    linkLabel: "CIRQUEON",
  },
  {
    icon: "🐸",
    label: "Psychonaut",
    text: "Strong proponent of legalisation of psychedelics — under reasonable regulation.",
  },
];

export default function FreeTime() {
  return (
    <BentoBlock>
      <h3 className="type-body font-medium text-text-primary">
        Mostly about taste and exploration.
      </h3>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <p className="type-label text-text-primary">
              <span aria-hidden="true">{item.icon}</span>{" "}
              <span className="font-medium">{item.label}</span>
              <span className="text-text-secondary"> — {item.text}</span>
              {item.href && (
                <>
                  {" "}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-citation-link hover:text-citation-link-hover"
                  >
                    {item.linkLabel} ↗
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </BentoBlock>
  );
}
