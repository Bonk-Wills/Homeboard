import styled from 'styled-components'

import {
  ActionIcon,
  Select,
  Tabs,
  Text,
} from '@mantine/core';
import { IconCopy, IconDownload, IconTrashX } from '@tabler/icons-react';

const languageOptions = [
  { icon: '🇫🇷', value: 'french', label: 'Français' },
  { icon: '🇬🇧', value: 'english', label: 'English' },
  { icon: '🇪🇸', value: 'spanish', label: 'Español' },
]

const CustomSelect = styled(Select)`
  margin-bottom: 10px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 95%;
`

const CustomActionIcon = styled(ActionIcon)`
  min-width: 1.75rem;
  min-height: 1.75rem;
  width: auto;
  height: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
`

function exportLocalStorageData() {
  const data = {};

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      data[key] = localStorage.getItem(key);
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'HomeboardSettings.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importLocalStorageData(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);
        const isConfirmed = window.confirm(
          "Êtes-vous sûr de vouloir remplacer les données actuelles du localStorage par ces nouvelles données?"
        );

        if (isConfirmed) {
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              localStorage.setItem(key, data[key]);
            }
          }
          alert("Données importées avec succès!");
          window.location.reload();
        } else {
          alert("Importation annulée.");
        }
      } catch (error) {
        alert("Erreur lors de l’importation des données.");
      }
    };

    reader.readAsText(file);
  }
}

function clearAllUserData() {
  const isConfirmed = window.confirm(
    "Êtes-vous sûr de vouloir supprimer toutes vos données du localStorage?"
  );

  if (isConfirmed) {
    localStorage.clear();
    alert("Toutes vos données ont été supprimées avec succès!");
    window.location.reload();
  } else {
    alert("Suppression annulée.");
  }
}


function handleFileInputClick() {
  const fileInput = document.getElementById("importFile");
  fileInput.click();
}

const setThemeField = (setTheme, field, value) => {
  setTheme((prevState) => ({
    ...prevState,
    [field]: value,
  }));
};

const CommonTab = ({ theme, setTheme }) => (
  <Tabs.Panel value="common" pt="xs">
    <br />
    <CustomSelect
      label="Language"
      value={theme.language || 'english'}
      icon={languageOptions.find((lang) => lang.value === theme.language)?.icon ?? '🇬🇧'}
      onChange={(newLanguage) => setThemeField(setTheme, 'language', newLanguage)}
      data={languageOptions}
      dropdownPosition="bottom"
      nothingFound="Nothing found"
      searchable
    />
    <br />

    {/* RETIRER ABSOLUTE ASAP */}
    <ButtonsContainer>
      <input
        type="file"
        id="importFile"
        onChange={importLocalStorageData}
        style={{ display: "none" }}
      />
      <CustomActionIcon onClick={exportLocalStorageData} variant="default">
        <IconDownload size={20} />
        <Text size="sm">Export data</Text>
      </CustomActionIcon>
      <CustomActionIcon onClick={handleFileInputClick} variant="default">
        <IconCopy size={20} />
        <Text size="sm">Import data</Text>
      </CustomActionIcon>
      <CustomActionIcon onClick={clearAllUserData} color="red" variant="light">
        <IconTrashX size={20} />
        <Text size="sm">Clear data</Text>
      </CustomActionIcon>
    </ButtonsContainer>
  </Tabs.Panel>
)

export default CommonTab
