const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5049/api";

export async function fetchTodayDoses() {
    try {
        const res = await fetch(`${API_BASE_URL}/doses/today`);
        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }
        return await res.json();
    } catch (e) {
        console.error('Error fetching today doses:', e);
        return [];
    }
}

export async function updateDoseStatus(id, status) {
    try {
        const res = await fetch(`${API_BASE_URL}/doses/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })

        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }
        return true;
    } catch (e) {
        console.error(`Error updating dose ${id}:`, e);
        return false;
    }
}

export async function getMedications(status = null) {
    try {
        const url = status
            ? `${API_BASE_URL}/medications?status=${encodeURIComponent(status)}`
            : `${API_BASE_URL}/medications`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("Could not reach .NET API for medications:", error);
        return null;
    }
}
/**
 * Send a new medication to the .NET 8 Web API (POST /api/medications)
 */
export async function addMedication(medicationData) {
    try {
        const res = await fetch(`${API_BASE_URL}/medications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicationData),
        });

        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.warn("Could not save to .NET API, saving locally:", error);
        // Fallback: create a local ID so the frontend still works even if backend is offline!
        return {
            ...medicationData,
            id: `med-${Date.now()}`,
            createdAt: new Date().toISOString(),
        };
    }
}
/**
 * Fetch all Prescriptions from PostgreSQL / .NET 8 Web API
 */
export async function getPrescriptions() {
    try {
        const response = await fetch(`${API_BASE_URL}/prescriptions`);
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("Could not reach .NET API for prescriptions:", error);
        return null;
    }
}

/**
 * Add a new Prescription to PostgreSQL (POST /api/prescriptions)
 */
export async function addPrescription(prescriptionData) {
    try {
        const res = await fetch(`${API_BASE_URL}/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescriptionData),
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn("Could not save prescription to .NET API:", error);
        return {
            ...prescriptionData,
            id: `rx-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
    }
}

/**
 * Fetch all Family Members from PostgreSQL / .NET 8 Web API
 */
export async function getFamilyMembers() {
    try {
        const response = await fetch(`${API_BASE_URL}/family`);
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("Could not reach .NET API for family members:", error);
        return null;
    }
}

/**
 * Add a new Family Member to PostgreSQL (POST /api/family)
 */
export async function addFamilyMember(memberData) {
    try {
        const res = await fetch(`${API_BASE_URL}/family`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData),
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn("Could not save family member to .NET API:", error);
        return {
            ...memberData,
            id: `fam-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
    }
}
