 // Products sorted by payment period
    let mnth_prods = [];
    let qrt_prods = [];
  
    // Products sorted by type
    const virtual_assistant = [["Virtual Assistant - Business", "Virtual Assistant - Premium"], ["Virtual Assistant - Business Quarterly", "Virtual Assistant - Premium Quarterly"]];
    const bookkeeping = [["Essential Bookkeeping", "Premium Bookkeeping"],["Essential Bookkeeping Quarterly", "Premium Bookkeeping Quarterly"]];
    const brand = [["Social Media & Email Marketing - Brand Builder", "Social Media & Email Marketing - Brand Accelerator"], ["Social Media & Email Marketing - Brand Accelerator Quarterly", "Social Media & Email Marketing - Brand Builder Quarterly"]];
    const bk_setup = ["Bookkeeping - Basic Setup", "Bookkeeping - Standard Setup", "Bookkeeping - Advanced Setup"];
    
    mnth_prods = mnth_prods.concat(bookkeeping[0], brand[0]);
    qrt_prods = qrt_prods.concat(bookkeeping[1], brand[1]);
    
    const socmed_accs = ["Social Media & Email Marketing - Facebook Business Page", "Social Media & Email Marketing - Instagram Business Page", "Social Media & Email Marketing - LinkedIn Business Page"];
