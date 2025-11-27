import Image from "next/image";

export function QuestImages(images, alt) {
    
    return (
        <div className="quest__images">
            {images.images.map((img, key) => {
                if(img.indexOf('http://') == 0 || img.indexOf('https://') == 0) {
                    return (
                        <div key={key} className="quest__images_block">
                            <img width={400} height={500} alt={images.alt} src={img}/>
                        </div>
                    )
                } else {
                    return (
                        <div key={key} className="quest__images_block">
                            <Image width={400} height={500} src={img} alt={images.alt} />
                        </div>
                    )
                }
            })}
            {/* <Image alt="картинка квеста" layout="fill" src="/images/quest-images/two.png" />
            <Image alt="картинка квеста" layout="fill" src="/images/quest-images/three.png" /> */}
        </div>
    )
}