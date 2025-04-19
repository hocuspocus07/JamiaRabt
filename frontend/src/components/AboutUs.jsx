
export function AboutUs() {
    return (
        <section>
            {/* Container */}
            <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
                {/* Component */}
                <div className="flex flex-col gap-14 lg:gap-20">
                    {/* Content */}
                    <div className="flex flex-col gap-14 lg:gap-20">
                        <div className="flex flex-col md:flex-row gap-5">
                            <h2 className="text-3xl md:text-5xl font-bold flex-1">
                                Our Story
                            </h2>
                            <p className="flex-1">
                                JamiaRabt was born from a simple truth: the bonds forged at Jamia don’t end at graduation. In 2025, 2 students came together to solve a challenge—how to keep Jamia’s diaspora thriving across borders and decades. Today, we’re a global network where memories meet new beginnings, and every alumnus has a place to belong.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <h2 className="text-3xl md:text-5xl font-bold flex-1">
                                Mission
                            </h2>
                            <p className="flex-1">
                                To bridge generations of Jamia alumni by fostering lifelong connections, celebrating shared achievements, and empowering our community through mentorship, opportunities, and collective growth.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <h2 className="text-3xl md:text-5xl font-bold flex-1">
                                Approach
                            </h2>
                            <p className="flex-1">
                                1. Inclusivity – Every batch, every branch, every story matters.<br/>

                                2. Action Over Nostalgia – From job referrals to campus mentorship, we enable real impact.<br/>

                                3. Jamia’s Legacy, Future-Focused – Honoring tradition while innovating for tomorrow’s needs.<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
