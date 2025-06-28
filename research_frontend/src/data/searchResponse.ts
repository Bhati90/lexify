export const searchResponse = [
    {
        "consolidated_summary": "Leaky integrate and fire neuron models have been used to simulate 2D neural networks and characterize leader neuron properties, identifying them as excitatory neurons with low membrane potential firing thresholds that send signals to many excitatory and few inhibitory neurons, while receiving few signals from other excitatory neurons [1004.2787v1]. A Hodgkin and Huxley type neuron model was used to propose that individual neurons process signals by binding synaptic inputs into a single output event based on temporal coherence, using inhibition as a control factor [0801.0250v1]. A contrastive learning framework, NeurPIR, was introduced to learn time-invariant representations of neurons from their activity data, enabling accurate neuron type and location prediction [2502.10425v2]. A simplified neuronal network model was used to demonstrate that lesions disrupting neuronal connections or killing neurons cause different types of desynchronization in the brain [1510.01732v1]. A mechanism based on threshold-type reaction, stochastic stimuli, and electrical leakage in projection neurons can enhance the selectivity of olfactory bulb projection neurons [1904.08767v1].\n",
        "papers": [
            {
                "abstract": "Several experimental studies show the existence of leader neurons in\npopulation bursts of 2D living neural networks. A leader neuron is, basically,\na neuron which fires at the beginning of a burst (respectively network spike)\nmore often that we expect by looking at its whole mean neural activity. This\nmeans that leader neurons have some burst triggering power beyond a simple\nstatistical effect. In this study, we characterize these leader neuron\nproperties. This naturally leads us to simulate neural 2D networks. To build\nour simulations, we choose the leaky integrate and fire (lIF) neuron model. Our\nlIF model has got stable leader neurons in the burst population that we\nsimulate. These leader neurons are excitatory neurons and have a low membrane\npotential firing threshold. Except for these two first properties, the\nconditions required for a neuron to be a leader neuron are difficult to\nidentify and seem to depend on several parameters involved in the simulations\nthemself. However, a detailed linear analysis shows a trend of the properties\nrequired for a neuron to be a leader neuron. Our main finding is: A leader\nneuron sends a signal to many excitatory neurons as well as to a few inhibitory\nneurons and a leader neuron receives only a few signals from other excitatory\nneurons. Our linear analysis exhibits five essential properties for leader\nneurons with relative importance. This means that considering a given neural\nnetwork with a fixed mean number of connections per neuron, our analysis gives\nus a way of predicting which neuron can be a good leader neuron and which\ncannot. Our prediction formula gives us a good statistical prediction even if,\nconsidering a single given neuron, the success rate does not reach hundred\npercent.",
                "authors": [
                    "Cyrille Zbinden"
                ],
                "db_id": 11,
                "individual_summary": "This paper uses leaky integrate and fire (lIF) neuron models to simulate 2D neural networks and characterize the properties of leader neurons, finding that leader neurons are excitatory, have low membrane potential firing thresholds, send signals to many excitatory and few inhibitory neurons, and receive few signals from other excitatory neurons. The authors' linear analysis identifies five essential properties for leader neurons, providing a statistical prediction method for identifying potential leader neurons within a network.\n",
                "is_processed_for_chat": false,
                "paper_id": "1004.2787v1",
                "pdf_url": "http://arxiv.org/pdf/1004.2787v1",
                "published": "2010-04-16",
                "qdrant_collection_name": null,
                "source": "arXiv",
                "title": "Leader neurons in leaky integrate and fire neural network simulations"
            },
            {
                "abstract": "A mechanism is proposed for increasing selectivity of olfactory bulb\nprojection neurons as compared to the olfactory receptor neurons, which could\noperate under low odor concentration, when the lateral inhibition mechanism\nbecomes inefficient. The mechanism proposed is based on the threshold-type\nreaction to stimuli a projection neuron receives from the receptor neurons, the\nstochastic nature of those stimuli and electrical leakage in the projection\nneurons. The mechanism operates at the level of individual projection neuron\nand does not require involvement of other bulbar neurons.\n  Keywords: olfactory receptor neuron; projection neuron; selectivity;\nstochastic process; theory",
                "authors": [
                    "Alexander Vidybida"
                ],
                "db_id": 12,
                "individual_summary": "This paper proposes a mechanism based on threshold-type reaction, stochastic stimuli, and electrical leakage in projection neurons to enhance the selectivity of olfactory bulb projection neurons compared to olfactory receptor neurons, especially under low odor concentrations. The proposed mechanism operates at the level of individual projection neurons without requiring other bulbar neurons.\n",
                "is_processed_for_chat": true,
                "paper_id": "1904.08767v1",
                "pdf_url": "http://arxiv.org/pdf/1904.08767v1",
                "published": "2019-04-18",
                "qdrant_collection_name": "paper_1904_08767v1",
                "source": "arXiv",
                "title": "Stochastic mechanism for improving selectivity of olfactory projection neurons"
            },
            {
                "abstract": "Based on numerical simulation of Hodgkin and Huxley type neuron stimulated\nfrom many synaptic inputs, an abstract concept of signal processing in\nindividual neuron is proposed. In the concept proposed, neuron performs binding\nof synaptic inputs into a single output event, based on the degree of temporal\ncoherence between the inputs. Inhibition serves as controlling factor of this\ntype of binding.",
                "authors": [
                    "A. K. Vidybida"
                ],
                "db_id": 13,
                "individual_summary": "This paper proposes a concept of signal processing in individual neurons where neurons bind synaptic inputs into a single output event based on temporal coherence, using inhibition as a control factor, which is based on numerical simulation of a Hodgkin and Huxley type neuron.\n",
                "is_processed_for_chat": true,
                "paper_id": "0801.0250v1",
                "pdf_url": "http://arxiv.org/pdf/0801.0250v1",
                "published": "2007-12-31",
                "qdrant_collection_name": "paper_0801_0250v1",
                "source": "arXiv",
                "title": "Information processing at single neuron level"
            },
            {
                "abstract": "The Platonic Representation Hypothesis suggests a universal,\nmodality-independent reality representation behind different data modalities.\nInspired by this, we view each neuron as a system and detect its multi-segment\nactivity data under various peripheral conditions. We assume there's a\ntime-invariant representation for the same neuron, reflecting its intrinsic\nproperties like molecular profiles, location, and morphology. The goal of\nobtaining these intrinsic neuronal representations has two criteria: (I)\nsegments from the same neuron should have more similar representations than\nthose from different neurons; (II) the representations must generalize well to\nout-of-domain data. To meet these, we propose the NeurPIR (Neuron Platonic\nIntrinsic Representation) framework. It uses contrastive learning, with\nsegments from the same neuron as positive pairs and those from different\nneurons as negative pairs. In implementation, we use VICReg, which focuses on\npositive pairs and separates dissimilar samples via regularization. We tested\nour method on Izhikevich model-simulated neuronal population dynamics data. The\nresults accurately identified neuron types based on preset hyperparameters. We\nalso applied it to two real-world neuron dynamics datasets with neuron type\nannotations from spatial transcriptomics and neuron locations. Our model's\nlearned representations accurately predicted neuron types and locations and\nwere robust on out-of-domain data (from unseen animals). This shows the\npotential of our approach for understanding neuronal systems and future\nneuroscience research.",
                "authors": [
                    "Wei Wu",
                    "Can Liao",
                    "Zizhen Deng",
                    "Zhengrui Guo",
                    "Jinzhuo Wang"
                ],
                "db_id": 14,
                "individual_summary": "The paper introduces NeurPIR, a contrastive learning framework using VICReg, to learn time-invariant representations of neurons from their activity data under various conditions, demonstrating accurate neuron type and location prediction on both simulated and real-world datasets, even with out-of-domain data.\n",
                "is_processed_for_chat": true,
                "paper_id": "2502.10425v2",
                "pdf_url": "http://arxiv.org/pdf/2502.10425v2",
                "published": "2025-02-06",
                "qdrant_collection_name": "paper_2502_10425v2",
                "source": "arXiv",
                "title": "Neuron Platonic Intrinsic Representation From Dynamics Using Contrastive Learning"
            },
            {
                "abstract": "To accomplish a task, the brain works like a synchronized neuronal network\nwhere all the involved neurons work together. When a lesion spreads in the\nbrain, depending on its evolution, it can reach a significant portion of\nrelevant area. As a consequence, a phase transition might occur: the neurons\ndesynchronize and cannot perform a certain task anymore. Lesions are\nresponsible for either disrupting the neuronal connections or, in some cases,\nfor killing the neuron. In this work, we will use a simplified model of\nneuronal network to show that these two types of lesions cause different types\nof desynchronization.",
                "authors": [
                    "Fabiano A. S. Ferrari",
                    "Ricardo L. Viana"
                ],
                "db_id": 15,
                "individual_summary": "This paper uses a simplified neuronal network model to demonstrate that lesions, which either disrupt neuronal connections or kill neurons, cause different types of desynchronization in the brain. The study investigates how these distinct desynchronization processes occur when lesions spread and affect a significant portion of the neuronal network.\n",
                "is_processed_for_chat": true,
                "paper_id": "1510.01732v1",
                "pdf_url": "http://arxiv.org/pdf/1510.01732v1",
                "published": "2015-10-06",
                "qdrant_collection_name": "paper_1510_01732v1",
                "source": "arXiv",
                "title": "Two distinct desynchronization processes caused by lesions in globally coupled neurons"
            }
        ],
        "token_usage_consolidated": {
            "input": 646,
            "output": 245
        }
    }
]