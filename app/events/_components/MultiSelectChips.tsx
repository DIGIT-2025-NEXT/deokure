"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import TourIcon from '@mui/icons-material/Tour';
import city7 from '../data/city7';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function MultiSelectChips() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = () => {
    const categories = ['レストラン', 'カフェ', '観光'];
    const selectedCategory = categories[tabValue];
    console.log('検索実行:', {
      category: selectedCategory,
      areas: selectedValues
    });
    // ここで実際の検索処理を実装
    alert(`${selectedCategory}を${selectedValues.join('、')}で検索します`);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, p: 2 }}>
      {/* タブナビゲーション */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        mb: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: '8px 8px 0 0'
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="カテゴリータブ"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
              height: '3px',
            },
            '& .MuiTab-root': {
              minHeight: '48px',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#666',
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 600,
              }
            }
          }}
        >
          <Tab 
            icon={<RestaurantIcon />} 
            label="レストラン" 
            iconPosition="start"
            sx={{ gap: 1 }}
          />
          <Tab 
            icon={<LocalCafeIcon />} 
            label="カフェ" 
            iconPosition="start"
            sx={{ gap: 1 }}
          />
          <Tab 
            icon={<TourIcon />} 
            label="観光" 
            iconPosition="start"
            sx={{ gap: 1 }}
          />
        </Tabs>
      </Box>

      {/* タブパネル */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ fontSize: '0.9rem', color: '#666', mb: 1.5 }}>
            🏛️ 観光スポットを検索する区を選択してください
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ fontSize: '0.9rem', color: '#666', mb: 1.5 }}>
            ☕ カフェを検索する区を選択してください
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ fontSize: '0.9rem', color: '#666', mb: 1.5 }}>
            🍽️ レストランを検索する区を選択してください
          </Box>
        </Box>
      </TabPanel>

      {/* 区選択のAutocomplete */}
      <Autocomplete
        multiple
        id="multi-select-chips"
        options={city7.map((option) => option.label)}
        value={selectedValues}
        onChange={(event, newValue) => {
          setSelectedValues(newValue);
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                border: '1px solid #bbdefb',
                borderRadius: '16px',
                height: '28px',
                fontSize: '0.75rem',
                fontWeight: 500,
                '& .MuiChip-deleteIcon': {
                  color: '#1976d2',
                  fontSize: '16px',
                  '&:hover': {
                    color: '#1565c0',
                  }
                }
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="区を選択してください"
            placeholder={selectedValues.length === 0 ? "区名を入力または選択..." : ""}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
                padding: '8px 12px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                '&.Mui-focused': {
                  color: '#1976d2',
                }
              }
            }}
          />
        )}
        sx={{
          '& .MuiAutocomplete-inputRoot': {
            flexWrap: 'wrap',
            gap: '6px',
            paddingTop: '6px',
            paddingBottom: '6px',
          },
          '& .MuiAutocomplete-input': {
            minWidth: '150px !important',
          }
        }}
        disableCloseOnSelect
        filterSelectedOptions
      />
      
      {/* 選択されたチップの表示エリア */}
      {selectedValues.length > 0 && (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <Box sx={{ 
            fontSize: '0.875rem', 
            color: '#666', 
            mb: 1,
            fontWeight: 500 
          }}>
            選択された区 ({selectedValues.length}件)
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedValues.map((value, index) => (
              <Chip
                key={index}
                label={value}
                color="primary"
                size="small"
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      
      {/* 検索ボタン */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={selectedValues.length === 0}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '12px 32px',
            borderRadius: '24px',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              backgroundColor: '#e0e0e0',
              color: '#9e9e9e',
              boxShadow: 'none',
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          検索する
        </Button>
      </Box>
    </Box>
  );
}