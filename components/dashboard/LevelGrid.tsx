import { LevelProgress } from "@/app/types/dashboard";

interface LevelGridProps {
  levels: LevelProgress[];
  currentLevel: number;
}

export function LevelGrid({ levels, currentLevel }: LevelGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {levels.map((level, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg flex flex-col items-center ${
            index + 1 <= currentLevel ? "bg-purple-100" : "bg-gray-100"
          }`}
        >
          <span className="font-bold">L{index + 1}</span>
          <span className="text-sm">x{level.multiplier}</span>
        </div>
      ))}
    </div>
  );
}
