"use client";

import { QuestBlock } from "@/shared/ui/quest-pages/index";
import { QuestNavigate } from "@/shared/ui/quest-pages/index";
import { QuestText } from "@/shared/ui/quest-pages/index";
import { QuestTitle } from "@/shared/ui/quest-pages/index";
import { QuestImages } from "@/shared/ui/quest-pages/questImages";
import { Booking } from "@/widgets/booking";
import { Record } from "@/widgets/record";
import { CardsState } from "@/widgets/quests/ui/quests";
import { useState } from "react";
import { MobileSliderQuest } from "@/shared/ui/mobile-slider-quest";

interface QuestPageProps {
    quest: CardsState;
}

export function QuestPage({ quest }: QuestPageProps) {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedTime, setSelectedTime] = useState<{ date: string; time: string } | null>(null);

    const handleTimeSelect = (date: string, time: string) => {
        setSelectedTime({ date, time });
        setShowBooking(true);
    };

    const handleCloseBooking = () => {
        setShowBooking(false);
        setSelectedTime(null);
    };

    return (
        <div className="quest">
            <QuestNavigate questName={quest.nameQuest} />
            <div className="quest__wrapper">
                <div className="quest__info">
                    <QuestTitle title={quest.nameQuest} />
                    <QuestBlock
                        location={quest.locationQuest}
                        price={quest.priceQuest}
                        maxPeople={quest.maxPeople}
                        level={quest.level}
                        history={quest.history}
                    />
                    <QuestText description={quest.descrQuest} />
                    <QuestText description={quest.descrQuestToo} />
                </div>

                <QuestImages images={quest.images} alt={quest.nameQuest}/>
                <MobileSliderQuest images={quest.images} alt={quest.nameQuest}/>
            </div>

            <Record onTimeSelect={handleTimeSelect} qId={quest.id} name={quest.nameQuest} />
        </div>
    );
}