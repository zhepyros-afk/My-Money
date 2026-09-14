        async function loadUserData() {
            if (!currentUser) return;
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                appData = docSnap.data();
                if (!appData.categories) {
                    appData.categories = [
                        { id: 'investasi', name: '1. Pengeluaran Investasi', rate: 0.15, formula: '0,15 × total pemasukan', expenses: [] },
                        { id: 'transportasi', name: '2. Pengeluaran Transportasi', rate: 0.20, formula: '0,20 × total pemasukan', expenses: [] },
                        { id: 'makan', name: '3. Pengeluaran Makan', rate: 0.50, formula: '0,50 × total pemasukan', expenses: [] },
                        { id: 'tak_terduga', name: '4. Pengeluaran Tak Terduga', rate: 0.15, formula: 'Sisa Saldo Dompet Keseluruhan', expenses: [] }
                    ];
                }
                if (!appData.trash) appData.trash = [];
                if (!appData.executedMondayDates) appData.executedMondayDates = [];
            } else {
                // Jika akun baru dan belum ada data sama sekali di database, inisialisasi bersih dari nol!
                appData = {
                    totalWallet: 0,
                    totalCumulativeIncome: 0,
                    incomes: [],
                    categories: [
                        { id: 'investasi', name: '1. Pengeluaran Investasi', rate: 0.15, formula: '0,15 × total pemasukan', expenses: [] },
                        { id: 'transportasi', name: '2. Pengeluaran Transportasi', rate: 0.20, formula: '0,20 × total pemasukan', expenses: [] },
                        { id: 'makan', name: '3. Pengeluaran Makan', rate: 0.50, formula: '0,50 × total pemasukan', expenses: [] },
                        { id: 'tak_terduga', name: '4. Pengeluaran Tak Terduga', rate: 0.15, formula: 'Sisa Saldo Dompet Keseluruhan', expenses: [] }
                    ],
                    trash: [],
                    executedMondayDates: []
                };
                await saveUserData();
            }
            checkAndExecuteMondayAutomation();
            renderApp();
        }
