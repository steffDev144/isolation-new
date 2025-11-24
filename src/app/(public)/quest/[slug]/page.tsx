import "./index.scss";
import { QuestPage } from "@/app-pages/quests";
import { CardsState } from "@/widgets/quests/ui/quests";
import axios from "axios";

const API_BASE_URL = "https://0275d3dd1dabf767.mokky.dev/card-main";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface QuestData {
  id: number;
  nameQuest?: string;
  address?: string;
  location?: string;
  price?: number | { starting_from: number };
  participants?: { min: number; max: number };
  maxPeople?: string;
  fear_level?: { value: string };
  level?: string;
}

async function fetchQuest(slug: string): Promise<CardsState | null> {
  try {
    const response = await axios.get<QuestData[]>(API_BASE_URL);
    const allQuests = response.data;

    const foundQuest = allQuests.find((quest: QuestData) => {
      if (quest.id === parseInt(slug) || quest.id.toString() === slug) {
        return true;
      }

      if (quest.nameQuest) {
        const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-');
        const normalizedQuestName = quest.nameQuest.toLowerCase().replace(/\s+/g, '-');
        const decodedSlug = decodeURIComponent(slug).toLowerCase();

        return normalizedQuestName === normalizedSlug ||
          quest.nameQuest.toLowerCase() === decodedSlug;
      }

      return false;
    });

    return foundQuest as CardsState || null;
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
}

export default async function Quest({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return (
      <div className="not-found">
        <p>Неверный идентификатор квеста</p>
      </div>
    );
  }

  const quest = await fetchQuest(slug);

  if (!quest) {
    return (
      <div className="not-found">
        <p>Квест не найден</p>
      </div>
    );
  }
  
  const transformedQuest: CardsState = {
    ...quest,
    location: quest.address || quest.location || '',
    price: typeof quest.price === 'object' && quest.price !== null
      ? (quest.price as { starting_from: number }).starting_from
      : (quest.price as number) || 0,
    maxPeople: quest.participants
      ? `${quest.participants.min}-${quest.participants.max}`
      : quest.maxPeople || '1-4',
    level: quest.fear_level?.value || quest.level || 'medium'
  };

  return <QuestPage quest={transformedQuest} />;
}