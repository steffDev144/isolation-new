import Image from "next/image";

export function QuestImages() {
    return (
        <div className="quest__images">
            <div className="quest__images_block">
                <Image width={400} height={500} alt="картинка квеста" src="/images/quest-images/one.png" />

            </div>
            <div className="quest__images_block">
                <Image width={400} height={500} alt="картинка квеста" src="/images/quest-images/two.png" />

            </div>
            <div className="quest__images_block">
                <Image width={400} height={500} alt="картинка квеста" src="/images/quest-images/three.png" />

            </div>
            {/* <Image alt="картинка квеста" layout="fill" src="/images/quest-images/two.png" />
            <Image alt="картинка квеста" layout="fill" src="/images/quest-images/three.png" /> */}
        </div>
    )
}