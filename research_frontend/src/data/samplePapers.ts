// import { ResearchPaper } from '../utils/types/research';

export const INITIAL_DATA: any[] = [
  {
    "consolidated_summary": "Deep learning with Convolutional Neural Networks (CNNs) has been applied to various tasks, including image classification [1604.04333v2], text categorization [1609.00718v1], EEG data analysis [2111.04309v1], and face recognition [1504.02351v1]. For image classification, a latent CNN framework can address the issue of irrelevant regions affecting classification performance [1604.04333v2]. In text categorization, shallow word-level CNNs can achieve better error rates and faster computation compared to deep character-level CNNs, although they require more storage [1609.00718v1]. CNNs can also be used to extract EEG-relevant features, revealing differences in frequency bands for tasks like EEG sex classification [2111.04309v1]. Furthermore, interactive visualization tools like CNN Explainer can help non-experts learn and examine CNNs [2004.15004v3]. In face recognition, the fusion of multiple CNNs and metric learning are crucial for good performance [1504.02351v1].\n",
    "papers": [
      {
        "abstract": "Deep Convolutional Neural Networks (CNN) have exhibited superior performance\nin many visual recognition tasks including image classification, object\ndetection, and scene label- ing, due to their large learning capacity and\nresistance to overfit. For the image classification task, most of the current\ndeep CNN- based approaches take the whole size-normalized image as input and\nhave achieved quite promising results. Compared with the previously dominating\napproaches based on feature extraction, pooling, and classification, the deep\nCNN-based approaches mainly rely on the learning capability of deep CNN to\nachieve superior results: the burden of minimizing intra-class variation while\nmaximizing inter-class difference is entirely dependent on the implicit feature\nlearning component of deep CNN; we rely upon the implicitly learned filters and\npooling component to select the discriminative regions, which correspond to the\nactivated neurons. However, if the irrelevant regions constitute a large\nportion of the image of interest, the classification performance of the deep\nCNN, which takes the whole image as input, can be heavily affected. To solve\nthis issue, we propose a novel latent CNN framework, which treats the most\ndiscriminate region as a latent variable. We can jointly learn the global CNN\nwith the latent CNN to avoid the aforementioned big irrelevant region issue,\nand our experimental results show the evident advantage of the proposed latent\nCNN over traditional deep CNN: latent CNN outperforms the state-of-the-art\nperformance of deep CNN on standard benchmark datasets including the CIFAR-10,\nCIFAR- 100, MNIST and PASCAL VOC 2007 Classification dataset.",
        "authors": [
          "Miao Sun",
          "Tony X. Han",
          "Xun Xu",
          "Ming-Chang Liu",
          "Ahmad Khodayari-Rostamabad"
        ],
        "db_id": 1,
        "individual_summary": "This paper introduces a latent CNN framework to address the issue of irrelevant regions affecting the classification performance of deep CNNs, by treating the most discriminate region as a latent variable and jointly learning the global CNN with the latent CNN. Experimental results demonstrate that the proposed latent CNN outperforms traditional deep CNNs on standard benchmark datasets, including CIFAR-10, CIFAR-100, MNIST, and PASCAL VOC 2007.\n",
        "is_processed_for_chat": false,
        "paper_id": "1604.04333v2",
        "pdf_url": "http://arxiv.org/pdf/1604.04333v2",
        "published": "2016-04-15",
        "qdrant_collection_name": null,
        "source": "arXiv", 
        "title": "Latent Model Ensemble with Auto-localization"
      },
      {
        "abstract": "This paper reports the performances of shallow word-level convolutional\nneural networks (CNN), our earlier work (2015), on the eight datasets with\nrelatively large training data that were used for testing the very deep\ncharacter-level CNN in Conneau et al. (2016). Our findings are as follows. The\nshallow word-level CNNs achieve better error rates than the error rates\nreported in Conneau et al., though the results should be interpreted with some\nconsideration due to the unique pre-processing of Conneau et al. The shallow\nword-level CNN uses more parameters and therefore requires more storage than\nthe deep character-level CNN; however, the shallow word-level CNN computes much\nfaster.",
        "authors": [
          "Rie Johnson",
          "Tong Zhang"
        ],
        "db_id": 2,
        "individual_summary": "The paper compares the performance of a shallow word-level convolutional neural network (CNN) to a deep character-level CNN for text categorization, finding that the shallow word-level CNN achieves better error rates and computes faster, but requires more storage.\n",
        "is_processed_for_chat": false,
        "paper_id": "1609.00718v1",
        "pdf_url": "http://arxiv.org/pdf/1609.00718v1",
        "published": "2016-08-31",
        "qdrant_collection_name": null,
        "source": "arXiv",
        "title": "Convolutional Neural Networks for Text Categorization: Shallow Word-level vs. Deep Character-level"
      },
      {
        "abstract": "Convolutional Neural Networks (CNNs) have achieved impressive performance on\nmany computer vision related tasks, such as object detection, image\nrecognition, image retrieval, etc. These achievements benefit from the CNNs'\noutstanding capability to learn discriminative features with deep layers of\nneuron structures and iterative training process. This has inspired the EEG\nresearch community to adopt CNN in performing EEG classification tasks.\nHowever, CNNs learned features are not immediately interpretable, causing a\nlack of understanding of the CNNs' internal working mechanism. To improve CNN\ninterpretability, CNN visualization methods are applied to translate the\ninternal features into visually perceptible patterns for qualitative analysis\nof CNN layers. Many CNN visualization methods have been proposed in the\nComputer Vision literature to interpret the CNN network structure, operation,\nand semantic concept, yet applications to EEG data analysis have been limited.\nIn this work we use 3 different methods to extract EEG-relevant features from a\nCNN trained on raw EEG data: optimal samples for each classification category,\nactivation maximization, and reverse convolution. We applied these methods to a\nhigh-performing Deep Learning model with state-of-the-art performance for an\nEEG sex classification task, and show that the model features a difference in\nthe theta frequency band. We show that visualization of a CNN model can reveal\ninteresting EEG results. Using these tools, EEG researchers using Deep Learning\ncan better identify the learned EEG features, possibly identifying new class\nrelevant biomarkers.",
        "authors": [
          "Dung Truong",
          "Scott Makeig",
          "Arnaud Delorme"
        ],
        "db_id": 3,
        "individual_summary": "This paper explores the interpretability of Convolutional Neural Networks (CNNs) applied to EEG data by using visualization methods to extract EEG-relevant features from a CNN trained on raw EEG data, revealing a difference in the theta frequency band for an EEG sex classification task. The study demonstrates that visualizing a CNN model can reveal interesting EEG results and help identify learned EEG features and potential biomarkers.\n",
        "is_processed_for_chat": false,
        "paper_id": "2111.04309v1",
        "pdf_url": "http://arxiv.org/pdf/2111.04309v1",
        "published": "2021-11-08",
        "qdrant_collection_name": null,
        "source": "arXiv",
        "title": "Assessing learned features of Deep Learning applied to EEG"
      },
      {
        "abstract": "Deep learning's great success motivates many practitioners and students to\nlearn about this exciting technology. However, it is often challenging for\nbeginners to take their first step due to the complexity of understanding and\napplying deep learning. We present CNN Explainer, an interactive visualization\ntool designed for non-experts to learn and examine convolutional neural\nnetworks (CNNs), a foundational deep learning model architecture. Our tool\naddresses key challenges that novices face while learning about CNNs, which we\nidentify from interviews with instructors and a survey with past students. CNN\nExplainer tightly integrates a model overview that summarizes a CNN's\nstructure, and on-demand, dynamic visual explanation views that help users\nunderstand the underlying components of CNNs. Through smooth transitions across\nlevels of abstraction, our tool enables users to inspect the interplay between\nlow-level mathematical operations and high-level model structures. A\nqualitative user study shows that CNN Explainer helps users more easily\nunderstand the inner workings of CNNs, and is engaging and enjoyable to use. We\nalso derive design lessons from our study. Developed using modern web\ntechnologies, CNN Explainer runs locally in users' web browsers without the\nneed for installation or specialized hardware, broadening the public's\neducation access to modern deep learning techniques.",
        "authors": [
          "Zijie J. Wang",
          "Robert Turko",
          "Omar Shaikh",
          "Haekyu Park",
          "Nilaksh Das",
          "Fred Hohman",
          "Minsuk Kahng",
          "Duen Horng Chau"
        ],
        "db_id": 4,
        "individual_summary": "The paper introduces CNN Explainer, an interactive visualization tool designed to help non-experts learn and examine convolutional neural networks (CNNs) by providing a model overview and dynamic visual explanations. A user study showed that CNN Explainer helps users understand the inner workings of CNNs more easily, and is engaging and enjoyable to use.\n",
        "is_processed_for_chat": false,
        "paper_id": "2004.15004v3",
        "pdf_url": "http://arxiv.org/pdf/2004.15004v3",
        "published": "2020-04-30",
        "qdrant_collection_name": null,
        "source": "arXiv",
        "title": "CNN Explainer: Learning Convolutional Neural Networks with Interactive Visualization"
      },
      {
        "abstract": "Deep learning, in particular Convolutional Neural Network (CNN), has achieved\npromising results in face recognition recently. However, it remains an open\nquestion: why CNNs work well and how to design a 'good' architecture. The\nexisting works tend to focus on reporting CNN architectures that work well for\nface recognition rather than investigate the reason. In this work, we conduct\nan extensive evaluation of CNN-based face recognition systems (CNN-FRS) on a\ncommon ground to make our work easily reproducible. Specifically, we use public\ndatabase LFW (Labeled Faces in the Wild) to train CNNs, unlike most existing\nCNNs trained on private databases. We propose three CNN architectures which are\nthe first reported architectures trained using LFW data. This paper\nquantitatively compares the architectures of CNNs and evaluate the effect of\ndifferent implementation choices. We identify several useful properties of\nCNN-FRS. For instance, the dimensionality of the learned features can be\nsignificantly reduced without adverse effect on face recognition accuracy. In\naddition, traditional metric learning method exploiting CNN-learned features is\nevaluated. Experiments show two crucial factors to good CNN-FRS performance are\nthe fusion of multiple CNNs and metric learning. To make our work reproducible,\nsource code and models will be made publicly available.",
        "authors": [
          "Guosheng Hu",
          "Yongxin Yang",
          "Dong Yi",
          "Josef Kittler",
          "William Christmas",
          "Stan Z. Li",
          "Timothy Hospedales"
        ],
        "db_id": 5,
        "individual_summary": "This paper evaluates CNN-based face recognition systems trained on the LFW database, proposes three CNN architectures, compares CNN architectures quantitatively, evaluates the effect of different implementation choices, and identifies several useful properties of CNN-FRS. The study found that the fusion of multiple CNNs and metric learning are two crucial factors for good CNN-FRS performance.\n",
        "is_processed_for_chat": false,
        "paper_id": "1504.02351v1",
        "pdf_url": "http://arxiv.org/pdf/1504.02351v1",
        "published": "2015-04-09",
        "qdrant_collection_name": null,
        "source": "arXiv",
        "title": "When Face Recognition Meets with Deep Learning: an Evaluation of Convolutional Neural Networks for Face Recognition"
      }
    ],
    "token_usage_consolidated": {
      "input": 708,
      "output": 268
    }
  }
];