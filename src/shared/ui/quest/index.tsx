import { DubnaIcon } from "@/shared/DubnaIcon/DubnaIcon";
import { KeyIcon } from "../svg/CardIcons/KeyIcon";
import { PersoneIcon } from "../svg/CardIcons/PersonIcon";
import { ScullIcon } from "../svg/CardIcons/ScullIcon";
import Image from "next/image";
import "./index.scss";
import { RedButton } from "../RedButton/RedButton";
import { KeyDisableIcon } from "../svg/CardIcons/KeyDisableIcon";
import Link from "next/link";
import { ScullDisableIcon } from "../svg/CardIcons/ScullDisableIcon";

export function Quest({
    id,
    nameQuest,
    descrQuest,
    locationQuest,
    priceQuest,
    maxPeople,
    imageUrl,
    keys,
    complexity
}: {
    id: number
    nameQuest: string;
    descrQuest: string;
    locationQuest: string;
    priceQuest: number;
    maxPeople: string;
    complexity: number;
    imageUrl: string;
    keys: number;
}) {

    const renderScullIcons = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <div key={`scull-${index}`}>
                {index < complexity ? <ScullIcon /> : <ScullDisableIcon />}
            </div>
        ));
    };

    const renderKeyIcons = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <div key={`key-${index}`}>
                {index < keys ? <KeyIcon /> : <KeyDisableIcon />}
            </div>
        ));
    };

    let img;

    if(imageUrl.indexOf('http://') == 0 || imageUrl.indexOf('https://') == 0) {
        img = (
            <img width={300} height={300} alt={nameQuest} src={imageUrl}/>
        )
    } else {
        img = <Image width={300} height={300} src={imageUrl} alt={nameQuest} />
    }

    return (
        <Link href={`/quest/${id}`} className="quests__item">

            <div className="quests__item_img">
                {img}
            </div>



            <h4 className="quests__item_title">{nameQuest}</h4>
            <p className="quests__item_descr">{descrQuest.length > 40 ? `${descrQuest.slice(0, 75).trim()}...` : descrQuest}</p>

            <div className="quests__item_line-container">
                <hr className="quests__item_line" />
            </div>

            <div className="quests__item_settings">
                <div className="quests__item_settings-count">
                    <PersoneIcon />
                    <p className="quests__item_settings-count_text">{maxPeople}</p>
                </div>

                <div className="quests__item_settings-complexity">
                    {renderScullIcons()}
                </div>

                <div className="quests__item_settings-keys">
                    {renderKeyIcons()}
                </div>
            </div>

            <div className="quests__item_locate">
                <DubnaIcon />
                <p className="quests__item_locate-text">{locationQuest}</p>
            </div>

            <div className="quests__item_price">
                <p className="quests__item_price-value">от {priceQuest} ₽</p>
                <RedButton classButton="quests__item_price-buy" textButton="забронировать" altImage="забронировать" />
            </div>
        </Link>
    )
}