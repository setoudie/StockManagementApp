import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta

# Configuration Sénégalaise
fake = Faker('fr_FR')
produits = ['Lait_1L', 'Tomates_kg', 'Oignons_kg', 'Bananes_kg', 'Poulet_frais', 'Poisson_frais', 'Riz_5kg', 'Sucre_1kg', 'Huile_1L', 'Pommes_kg']
categories = ['produit_frais', 'legume', 'legume', 'fruit', 'viande', 'poisson', 'epicerie', 'epicerie', 'epicerie', 'fruit']
magasins = ['Dakar_Corniche', 'Thies_Centre', 'Saint-Louis_Marche']

# Période : 3 ans de données (jan-2022 a Dec-2024)
num_days = 1095  # 3 ans (365 * 3)
dates = pd.date_range(start='2022-01-01', periods=num_days)
num_produits = len(produits)

# Initialisation DataFrame
data = {
    'date': np.repeat(dates, num_produits),
    'produit_id': np.tile(produits, num_days),
    'categorie': np.tile(categories, num_days),
    'quantite_vendue': np.random.poisson(
        lam=[80, 120, 90, 60, 40, 70, 50, 30, 100, 80],  # Lambda pour chaque produit
        size=(num_days, num_produits)  # Shape (jours × produits)
    ).flatten(),  # Aplatir en 1D (1095 * 10 = 10950 éléments)
    'stock_initial': np.random.randint(100, 500, size=num_days*num_produits),
    'peremption_jours': np.random.choice([3, 5, 7, 10, 14], size=num_days*num_produits),
    'prix_vente': np.tile([1200, 500, 300, 700, 2500, 1500, 2000, 400, 800, 600], num_days),
    'promotion': np.random.choice([0, 1], size=num_days*num_produits, p=[0.85, 0.15]),
    'temperature_max': np.clip(np.random.normal(32, 5, num_days*num_produits), 25, 45),
    'pluie_mm': np.round(np.random.exponential(2, num_days*num_produits), 1),
    'evenement': 'None',
    'magasin': np.random.choice(magasins, size=num_days*num_produits)
}

df = pd.DataFrame(data)

# Ajout des événements culturels
ramadan_2022 = (datetime(2022, 4, 2), datetime(2022, 5, 2))
ramadan_2023 = (datetime(2023, 3, 23), datetime(2023, 4, 21))
ramadan_2024 = (datetime(2024, 3, 11), datetime(2024, 4, 9))
tabaski = [datetime(2022, 7, 10), datetime(2023, 6, 29), datetime(2024, 6, 17)]

df['evenement'] = np.where(
    df['date'].between(*ramadan_2022) | df['date'].between(*ramadan_2023) | df['date'].between(*ramadan_2024),
    'Ramadan',
    np.where(df['date'].isin(tabaski), 'Tabaski', 'None')
)

# Ajustement des ventes pendant les événements
df.loc[df['evenement'] == 'Ramadan', 'quantite_vendue'] *= np.random.uniform(1.5, 3.0, size=len(df[df['evenement'] == 'Ramadan']))
df.loc[df['evenement'] == 'Tabaski', 'quantite_vendue'] *= np.random.uniform(2.0, 4.0, size=len(df[df['evenement'] == 'Tabaski']))

# Ajout d'anomalies
anomalies = np.random.choice(len(df), size=100, replace=False)
df.loc[anomalies, 'quantite_vendue'] *= np.random.uniform(3, 10, size=100)

# Formatage final
df = df.round({'temperature_max': 1, 'pluie_mm': 1})
df['date'] = df['date'].dt.strftime('%Y-%m-%d')
df = df.sample(frac=1).reset_index(drop=True)  # Mélange des données

# Sauvegarde
df.to_csv('dataset_gestion_stocks_senegal_2022-2024.csv', index=False)