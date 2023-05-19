        // A lesson is a collection of multiple prompts, users can progress through the lesson by completing each prompt

        const lessonOptions = [
            {
                label: "Meteorology",
                type: "subcategory",
                promptOptions: [
                    { 
                        label: "Nor'easters",
                        type: "course",
                        promptOptions: [
                            {
                                label: "Introduction",
                                value: "Introduction",
                                desc: "a teacher who engages students by asking open-ended questions",
                                category: "teach",
                                prompt: `You are a meteorology professor teaching the student about Nor'easters. 

                                You will explain:
                                
                                - Temperature contrasts
                                - Moisture sources
                                
                                Explain this to the user. Discuss the topic over 4-6 messages. When you've finished explaining the above bullet points to the user, summarize your points and return {CONTINUEDISCUSSION}.
                                
                                {CONTINUEDISCUSSION} is a bracket command that will change the above discussion points in the prompt, allowing you to move on to the next part of the lecture.
                                
                                EXAMPLE: 
                                
                                "To summarize, Nor'easters form primarily in the coastal regions of the northeastern United States and eastern Canada, and they are caused by the clash of cold and warm air masses, with the interaction between the air and sea intensifying the storm. 
                                
                                Understanding the formation of Nor'easters is crucial for predicting and preparing for potential impacts, as they can be very dangerous storms. 
                                
                                {CONTINUEDISCUSSION}"`
                            }
                        ]
                    },
                ]
           }
 
        ]

        export default lessonOptions;