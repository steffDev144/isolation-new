import Image from "next/image";
import { useEffect, useState } from "react";

interface QuestInfo {
  quest_info: {
    duration_minutes: number;
    participants: {
      min: number;
      max: number;
    };
    price: {
      starting_from: number;
      currency: string;
    };
    details_link: string;
    fear_level: {
      value: number;
      max: number;
      details_link: string;
    };
    address: {
      city: string;
      street: string;
      building: string;
    };
    versions: {
      available: boolean;
      description: string;
      details_link: string;
    };
  };
}

interface QuestBlockProps {
  location: string;
  price: number;
  maxPeople: string;
  level?: number;
}

export function QuestBlock({ location, price, maxPeople, level }: QuestBlockProps) {
  const [questInfo, setQuestInfo] = useState<QuestInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestInfo = async () => {
      try {
        const response = await fetch('https://0275d3dd1dabf767.mokky.dev/quest-info');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setQuestInfo(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestInfo();
  }, []);

  if (loading) {
    return <div className="quest__info_block">Загрузка...</div>;
  }

  if (error) {
    return <div className="quest__info_block">Ошибка: {error}</div>;
  }

  if (!questInfo) {
    return <div className="quest__info_block">Данные не найдены</div>;
  }

  const { quest_info } = questInfo;

  return (
    <div className="quest__info_block">
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Время прохождения:</h5>
        <p className="quest__info_block-item_descr">{quest_info.duration_minutes} минут</p>
      </div>
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Кол-во участников:</h5>
        <p className="quest__info_block-item_descr">
          {quest_info.participants.min}-{quest_info.participants.max}
        </p>
      </div>
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Цена:</h5>
        <p className="quest__info_block-item_descr">от {quest_info.price.starting_from} руб</p>
        <Image src="/icons/questionIcon.svg" width={20} height={20} alt="подробнее" />
        <div className="q_modal first" style={{width: "455px"}}>
          Стоимость квеста за 2 участников - 4 500 руб.
          Стоимость за каждого дополнительного игрока - 900 руб.
          Вечернее время - 1 000 руб. к общей стоимости на команду
          Выходные дни - 1 000 руб. к общей стоимости на команду
        </div>
      </div>
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Уровень страха:</h5>
        <p className="quest__info_block-item_descr">
          {quest_info.fear_level.value}/{quest_info.fear_level.max}
        </p>
        <Image src="/icons/questionIcon.svg" width={20} height={20} alt="подробнее" />
        <div className="q_modal" style={{width: "396px"}}>
          0/5 - полностью без страха: яркий свет, нет страшных декораций <br />
          1/5 - полное освещение, возможен страшный декор <br />
          2/5 - страшный декор, антуражное освещение, возможны скримеры <br />
          3/5 - страшный декор, скримеры, умеренная игра актера <br />
          4/5 - страшный декор, скримеры, плотный контакт с актерами и механизмами <br />
          5/5 - страшный декор, скримеры, очень плотный и частый контакт с актерами и механизмами <br />
        </div>
      </div>
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Адрес:</h5>
        <p className="quest__info_block-item_descr">
          {location}
        </p>
      </div>
      <div className="quest__info_block-item">
        <h5 className="quest__info_block-item_title">Версии:</h5>
        <p className="quest__info_block-item_descr">
          {quest_info.versions.description}
        </p>
        <Image src="/icons/questionIcon.svg" width={20} height={20} alt="подробнее" />
        <div className="q_modal" style={{width: "320px"}}>
          Это место, которое давно не посещали люди, приют считается заброшенным и в нем давно никто не работает. Однако, слухи говорят об обратном, и ребятам предстоит проверить данную информацию. Настоятельница отправится вместе с командой, чтобы помочь им ориентироваться в этих стенах.
        </div>
      </div>
    </div>
  );
}