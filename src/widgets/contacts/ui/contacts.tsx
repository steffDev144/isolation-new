"use client"

import { TitleSection } from "@/shared/ui/title-section"
import "./contacts.scss"
import { LocationBlock } from "@/shared/ui/location-block"
import { SortQuest } from "@/shared/ui/sort-quest"
import { useEffect, useState } from "react"
import axios from "axios"

interface ContactInfo {
    id: number;
    "number-phone"?: string;
    email?: string;
    "address-corporation"?: string;
    "types-quest"?: string[];
}

export function Contacts() {
    const [contacts, setContacts] = useState<ContactInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetContacts();
    }, []);

    const FetchContacts = async (): Promise<ContactInfo[]> => {
        try {
            const { data } = await axios.get<ContactInfo[]>("https://0275d3dd1dabf767.mokky.dev/contacts-section");
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const GetContacts = async (): Promise<void> => {
        setLoading(true);
        const data = await FetchContacts();
        setContacts(data);
        setLoading(false);
    };

    const contactInfo = contacts.find(item => item.id === 0);
    const firstLocation = contacts.find(item => item.id === 1);
    const secondLocation = contacts.find(item => item.id === 2);

    if (loading) {
        return <section className="contacts" id="contacts">Загрузка контактов...</section>;
    }

    return (
        <section className="contacts" id="contacts">
                <div className="contacts__wrapper">
                    <div className="contacts__text">
                        <TitleSection classTitle="contacts__text_title" text="контакты" />
                        {contactInfo && (
                            <>
                                <h3 className="contacts__text_number">
                                    {contactInfo["number-phone"]}
                                </h3>
                                <h4 className="contacts__text_email">
                                    {contactInfo.email}
                                </h4>
                            </>
                        )}

                        <div className="contacts__text_locations">
                            {firstLocation && (
                                <>
                                    <LocationBlock
                                        classLocationBlock="contacts__text_locations-title"
                                        classLocationText="contacts__text_locations-title_text"
                                        valueLocation={firstLocation["address-corporation"] || ""}
                                    />
                                    <ul className="contacts__text_locations-list">
                                        <SortQuest array={firstLocation["types-quest"] || []} />
                                    </ul>
                                </>
                            )}
                        </div>

                        <div className="contacts__text_locations">
                            {secondLocation && (
                                <>
                                    <LocationBlock
                                        classLocationBlock="contacts__text_locations-title"
                                        classLocationText="contacts__text_locations-title_text"
                                        valueLocation={secondLocation["address-corporation"] || ""}
                                    />
                                    <ul className="contacts__text_locations-list">
                                        <SortQuest array={secondLocation["types-quest"] || []} />
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="contacts__map">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A16f9c18041511b810d8c9c401bdf91fabdd7390f50c39e4242c55b760c7b9362&amp;source=constructor"
                            width="903"
                            height="667"
                            frameBorder="0"
                            title="Карта расположения"
                        ></iframe>
                    </div>
                </div>
        </section>
    )
}