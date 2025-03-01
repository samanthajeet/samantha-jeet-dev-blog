'use client'
import { TimelineEntry } from '@/components/TimelineEntry';
import Image from 'next/image';
import { useState } from 'react';
import { timelineData } from '@/data/timeline';

export default function AboutPage() {
    const [isCompact, setIsCompact] = useState(true)
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-7xl mx-auto px-6 py-12">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="relative h-[250px] rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                        src="/images/sam-boise.jpg"
                        alt="Profile photo"
                        width={800}
                        height={600}
                        className="rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <div className="max-w-4xl mx-auto flex justify-end">
                        <button
                            onClick={() => setIsCompact(!isCompact)}
                            className={`text-xs px-3 py-1.5 rounded-md transition-all duration-300 ${isCompact
                                ? 'bg-secondary text-light hover:bg-secondary/90'
                                : 'bg-dark text-light hover:bg-dark/90'
                                }`}
                        >
                            {isCompact ? 'Show Details' : 'Hide Details'}
                        </button>
                    </div>
                    <div className="border-r-2 border-secondary pr-4 text-right font-sans text-dark">
                        {timelineData.map((item, index) => (
                            <TimelineEntry
                                key={`${item.title}-${index}`}
                                title={item.title}
                                company={item.company}
                                dates={item.dates}
                                description={item.description}
                                isLifeEvent={item.isLifeEvent}
                                isCompact={isCompact}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <div className="w-full md:w-2/3 space-y-6">
                <h1 className="text-4xl font-bold text-dark font-permanent-marker">About Me</h1>
                <p className="text-dark">
                    Samantha has always dreamed of speaking about herself in the third person and is thankful for this opportunity.
                </p>
                <p className="text-dark">
                    Miss Jeet, as she&apos;s occasionally called, is a passionate Full-Stack Software Engineer with 5 years of experience crafting innovative solutions using React, JavaScript, TypeScript, and Ruby on Rails. Born with the spirit of Aloha, Sam was raised primarily on islands in The Pacific like Hawai&apos;i, the Philippines, and Japan. Proof of this is seen in her wide feet, year-round sandal tan, and immense love for Spam and rice.
                </p>
                <p className="text-dark">
                    Before becoming a developer, Samantha was a GIS Specialist working in the transit management and design industry. Though she loved geography and those she worked with, she knew it wouldn&apos;t fulfill her much longer. This realization brought her back to coding, which she first discovered in middle school when she would edit her MySpace page and make GeoCities fan pages for Charmed and Star Trek Voyager.
                </p>
                <p className="text-dark">
                    Since moving to Salt Lake City in 2019 for her first developer role, Sam has had the great joy of working for cool organizations like Pluralsight and SixFifty. She&apos;s had the opportunity to learn from and work alongside some of the smartest and grooviest people in the business, while championing diversity and inclusion in tech.
                </p>
                <p className="text-dark">
                    A natural problem solver, Samantha thrives in collaborative environments, bringing a blend of technical expertise and empathetic communication to every project. She&apos;s constantly curious and always learning, with a knack for translating complex problems into elegant solutions.
                </p>
                <p className="text-dark">
                    Outside of work, Miss Jeet enjoys spending time with her partner and family, analog photography, binge-watching Bob&apos;s Burgers, calling her mom 3 times a day, renovating her house she promised her partner would only take 5 months to do, traveling, learning the new slang all the kids are using these days, and making lists.
                </p>
                <p className="text-dark">
                    Samantha is passionate about giving back to the community through tech education initiatives, including her role as a Technical Trainer for Tech-Moms. Her contributions to the Utah tech scene haven&apos;t gone unnoticed, with nominations for the Women Tech Award and YWCA Outstanding Achievement Award.
                </p>
                <p className="text-dark">
                    Miss Jeet holds a B.Sci in Health Care Administration and an M.Sci in Geographic Information Sciences. She promised her mom she would mention that.
                </p>
            </div>
        </div>
    )
}