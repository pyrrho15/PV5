export type TechStackOption = {
  id: number;
  name: string;
  icon?: string | null;
  category: string;
};

type TechStackPickerProps = {
  options: TechStackOption[];
  value: number[]; // the currently selected tech stack ids
  onChange: (ids: number[]) => void;
};

// The categories that exist in the tech_stack_category DB enum.
const CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "language",
  "tool",
];

// Checkbox picker used by the project and work forms. It shows the tech
// stack items grouped by category so it's easy to find what you want.
export default function TechStackPicker({
  options,
  value,
  onChange,
}: TechStackPickerProps) {
  function toggle(id: number) {
    if (value.includes(id)) {
      onChange(value.filter((selectedId) => selectedId !== id));
    } else {
      onChange([...value, id]);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-zinc-700">Tech stack</span>
      <div className="grid grid-cols-1 gap-4 rounded-md border border-zinc-300 p-4 sm:grid-cols-2 md:grid-cols-3">
        {CATEGORIES.map((category) => {
          const categoryItems = options.filter(
            (item) => item.category === category
          );

          // Skip empty categories so we don't render useless headings.
          if (categoryItems.length === 0) return null;

          return (
            <div key={category}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {category}
              </h4>
              <div className="flex flex-col gap-1">
                {categoryItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-sm text-zinc-700"
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}