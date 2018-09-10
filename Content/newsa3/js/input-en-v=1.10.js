var data = {
    "steps": [
      {
          "uid": "1",
          "group": "first",
          "type": "radios",
          "questions": [
            {
                "uid": "1000",
                "type": "first",
                "caption": "Discover if Invisalign is right for you.",
                "caption2": "Take the Smile Assessment",
                "text": "Millions of lives have been changed with the most advanced aligner system in the world.",
                "text1": "Why not see if Invisalign treatment could be right for you?",
                "qtext": "I am",
                "outcome_text": "You are",
                "random_answers": false,
                "answers": [
                  {
                      "uid": "1000",
                      "text": "Adult",
                      "outcome_text": "An adult considering Invisalign aligners for yourself.",
                      "result_text": "Adult",
                      "jump_step": "106",
                      "value": "A"
                  },
                  {
                      "uid": "1002",
                      "text": "Parent of teenager",
                      "outcome_text": "An adult considering Invisalign aligners for your child.",
                      "result_text": "Parent of teenager",
                      "jump_step": "106",
                      "value": "P"
                  }
                ]
            }
          ]
      },
      {
          "uid": "108",
          "group": "Timeline",
          "type": "radios",
          "questions": [
            {
                "uid": "19",
                "type": "radios",
                "caption": "Designed to move you forward",
                "text": "If Invisalign is the right choice for me, I intend to start treatment:",
                "outcome_text": "I intend to start treatment",
                "random_answers": false,
                "answers": [
                  {
                      "uid": "83",
                      "text": "Sometime this year"
                  },
                  {
                      "uid": "85",
                      "text": "Sometime next year"
                  }
                ]
            }
          ]
      },
      {
          "uid": "100",
          "group": "Goals",
          "type": "images",
          "questions": [
            {
                "uid": "1",
                "type": "radios",
                "caption": "Your current smile",
                "text": "What do you think most closely resembles your current teeth and smile?",
                "random_answers": false,
                "answers": [
                  {
                      "uid": "2",
                      "text": "This is my smile",
                      "description": "Underbite can occur when the lower teeth protrude past the front teeth.",
                      "image": "images/06_Underbite_k_rt1.svg",
                      "result_text": "Underbite",
                      "result_image": "images/Results/Underbite.png",
                      "outcome_text": "fix your issue with an underbite"
                  },
                  {
                      "uid": "3",
                      "text": "This is my smile",
                      "description": "Open bite often occurs when some teeth are unable to make physical contact with the opposing teeth for a proper bite.",
                      "result_text": "Open bite",
                      "image": "images/02_Open_Bite_K_rt1.svg",
                      "result_image": "images/Results/Openbite.png",
                      "outcome_text": "fix your issue with an open bite"
                  },
                  {
                      "uid": "9",
                      "text": "This is my smile",
                      "description": "Crossbite can occur when the upper and lower jaws are both misaligned.",
                      "result_text": "Crossbite",
                      "image": "images/01_Cross_Bite_K_rt1.svg",
                      "result_image": "images/Results/Crossbite.png",
                      "outcome_text": "fix your issue with a crossbite",
                  },
                  {
                      "uid": "98",
                      "text": "This is my smile",
                      "description": "Deep bite occurs when the upper teeth bite over the lower teeth.",
                      "result_text": "Deep bite",
                      "image": "images/03_Overbite_k_rt1.svg",
                      "result_image": "images/Results/Overbite.png",
                      "outcome_text": "fix your deep bite issue"
                  },
                  {
                      "uid": "4",
                      "text": "This is my smile",
                      "description": "Gaps between teeth can occur with abnormal continued growth of the jawbone. Missing teeth can also cause the surrounding teeth to shift due to the extra space, creating gaps in your teeth.",
                      "result_text": "Gapped teeth",
                      "image": "images/05_Gapped_Teeth_k_rt1.svg",
                      "result_image": "images/Results/Gappedteeth.png",
                      "outcome_text": "fix your spacing issue",
                  },
                  {
                      "uid": "5",
                      "text": "This is my smile",
                      "description": "Teeth crowding occurs when there is simply a lack of room within your jaw for all of your teeth to fit normally.",
                      "result_text": "Overly crowded",
                      "image": "images/04_Overcrowded_k_rt1.svg",
                      "result_image": "images/Results/Overcrowded.png",
                      "outcome_text": "fix your crowding issue.",
                  }
                ]
            }
          ]
      },
      {
          "uid": "105",
          "group": "Spacing",
          "type": "sliders",
          "questions": [
            {
                "uid": "3",
                "type": "sliders",
                "caption": "Teeth spacing.",
                "text": "How do you feel about the spacing of your teeth? Are they widely spaced with gaps or more tightly crowded?",
                "random_answers": false,
                "answers": [
                  {
                      "uid": "15",
                      "text": null,
                      "value": "250"
                  },
                  {
                      "uid": "16",
                      "text": null,
                      "value": "250"
                  }
                ],
                "slider_map": {
                    "1_1": "crowding",
                    "1_2": "crowding",
                    "1_3": "crowding",
                    "1_4": "crowding of the upper teeth/spacing of the lower teeth",
                    "1_5": "crowding of the upper teeth/spacing of the lower teeth",
                    "2_1": "crowding",
                    "2_2": "crowding",
                    "2_3": "crowding",
                    "2_4": "crowding of the upper teeth/spacing of the lower teeth",
                    "2_5": "crowding of the upper teeth/spacing of the lower teeth",
                    "3_1": "crowding",
                    "3_2": "crowding",
                    "3_3": "some misalignment",
                    "3_4": "spacing",
                    "3_5": "spacing",
                    "4_1": "spacing of the upper teeth/crowding of the lower teeth",
                    "4_2": "spacing of the upper teeth/crowding of the lower teeth",
                    "4_3": "spacing",
                    "4_4": "spacing",
                    "4_5": "spacing",
                    "5_1": "spacing of the upper teeth/crowding of the lower teeth",
                    "5_2": "spacing of the upper teeth/crowding of the lower teeth",
                    "5_3": "spacing",
                    "5_4": "spacing",
                    "5_5": "spacing"
                }
            }
          ]
      },
      {
          "uid": "109",
          "group": "Location",
          "type": "location",
          "questions": []
      },
      {
          "uid": "110",
          "group": "End",
          "type": "end",
          "questions": []
      }
    ],
    "Lang": {
        "label_smileassessment": "Smile Assessment",
        "label_step": "Step {num} of {total}",
        "label_continue": "Start",
        "label_required": "Enter your details here. All fields are required.",
        "label_firstname": "First Name",
        "label_lastname": "Last Name",
        "label_postalcode": "Postcode",
        "label_email": "Email",
        "label_shortdisclaimer": "Please be aware, the Smile Assessment does not offer a clinical diagnosis and is intended for general guidance purposes only. To discuss your treatment in detail, request an appointment with an Invisalign Provider.",
        "label_next": "Next",
        "label_previous": "Previous",
        "label_submit": "Submit",
        "label_crowded": "Crowded",
        "label_spaced": "Widely Spaced",
        "label_topteeth": "Top teeth",
        "label_bottomteeth": "Bottom teeth",
        "label_form_caption": "Smile Assessment Complete.",
        "label_form_subcaption": "What if you stopped wondering \"what if\"?",
        "label_form_t1": "Join the millions of people who have found their best smile with the Invisalign System. Enter your details below and we will share your Smile Assessment results, additional information and helpful resources to help you make your decision. We’ll also include details of your nearest Provider.",
        "label_form_t2": "For an accurate assessment of your suitability for Invisalign treatment, you’ll need to have a consultation with an Invisalign Provider.",
        "label_form_check": "I would like to receive information about Invisalign treatment and from partners of Align Technology, Inc. This information may contain special offers, information on local providers, and requests for feedback about your experience. Please be aware, the Smile Assessment does not offer a clinical diagnosis and is intended for general guidance purposes only. To discuss your treatment in detail, request an appointment with an Invisalign Provider.",
        "label_thankyou_title": "Thank you",
        "label_thankyou_title2": "Get ready for something great. Start with your smile.",
        "label_thankyou_t1": "Thank you for completing the Invisalign Smile Assessment! We will send the full assessment to your email account soon.",
        "label_thankyou_t2": "To ensure delivery of any emails that you have opted in to receive from Invisalign, including your personalised Smile Assessment results, please add our email address (info@news.invisalign.co.uk) to your Address Book or Safe Sender List.",
        "label_thankyou_recap": "Let’s recap on what you’ve told us:",
        "label_start_over": "Change image smile",
        "label_privacy": "Privacy Statement",
        "label_why_ask": "Why do we ask this?",
        "label_scales_a": "Using the scales below, move the points along the line until the illustration of teeth best matches your upper and lower set of teeth.",
        "label_scales_p": "Using the scales below, move the points along the line until the illustration of teeth best matches your child's upper and lower set of teeth.",
        "label_instructions": "INSTRUCTIONS:",
        "label_proceed": "In order to proceed to the next question, please answer the question above.",
        "error_server": "Server error.",
        "error_required": "Please complete all of the fields above.",
        "error_firstname": "First name is required",
        "error_lastname": "Last name is required",
        "error_postalcode": "Postcode is required",
        "error_email": "Email is required",
        "error_email_invalid": "Invalid email",
        "label_error": "Error"
    }
};