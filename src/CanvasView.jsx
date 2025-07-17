import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Typography, Grid, Paper, Box, Divider,
  Button, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './App.css';

export default function CanvasView() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const printRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem('marketingCanvasData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSaveAsPDF = () => {
    if (window.html2pdf && printRef.current) {
      window.html2pdf().from(printRef.current).set({
        margin: 0.5,
        filename: 'marketing-canvas.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      }).save();
    }
  };

  const handleReset = () => {
    localStorage.removeItem('marketingCanvasData');
    navigate('/');
  };

  if (!data) return <Typography>Loading...</Typography>;

  const renderList = (items, icon) => (
    <Stack spacing={0.5} sx={{ pl: 1 }}>
      {items.map((item, i) => (
        <Typography key={i} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ mr: 1 }}>{icon}</Box>
          {item}
        </Typography>
      ))}
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, fontFamily: "'Nanum Gothic', sans-serif" }}>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleReset}>다시 하기</Button>
        <Button variant="contained" onClick={handleSaveAsPDF} color="primary">PDF로 저장</Button>
      </Stack>

      <Box ref={printRef}>
        <Typography variant="h4" gutterBottom>📋 마케팅 캔버스 요약</Typography>

        <Grid container spacing={2}>
          {/* 왼쪽 열: 회사 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">① 회사 (Company)</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>제품 / 서비스</Typography>
              {renderList(
                data.productIdeas,
                <RocketLaunchIcon fontSize="small" sx={{ color: 'primary.main' }} />
              )}

              <Typography variant="subtitle2" sx={{ mt: 2 }}>비전</Typography>
              <Typography variant="body2">{data.vision}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>핵심 가치</Typography>
              <Typography variant="body2">{data.coreValue}</Typography>
            </Paper>
          </Grid>

          {/* 중앙 열: WHY / 가치 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">② 가치 (WHY)</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>사람은 다음과 같은 생각을 가지고 있어야 합니다:</Typography>
              <Stack spacing={1} sx={{ pl: 1 }}>
                {data.values.map((v, i) => (
                  <Typography key={i} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkspacePremiumIcon fontSize="small" sx={{ color: 'secondary.main', mr: 1 }} />
                    사람은{" "}
                    <Box
                      component="span"
                      sx={{
                        fontFamily: "'Noto Serif KR', serif",
                        fontStyle: 'italic',
                        fontWeight: 500,
                        color: 'text.primary',
                        ml: 0.5
                      }}
                    >
                      "{v}"
                    </Box>
                    {" "}해야 한다.
                  </Typography>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>마케팅 문장</Typography>
              <Box sx={{ bgcolor: 'grey.100', p: 2, borderLeft: '4px solid #1976d2', my: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 500,
                    fontFamily: "'Noto Serif KR', serif"
                  }}
                >
                  “{data.marketingPhrase}”
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* 오른쪽 열: 고객 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">③ 고객 (Target)</Typography>

              {data.customers.map((c, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">고객 {i + 1}</Typography>
                  <Typography variant="body2">{c.name} / {c.age}세 / {c.job}</Typography>
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <ArrowForwardIcon fontSize="small" sx={{ color: 'text.secondary', mt: '2px' }} />
                    <Box>
                      <Typography variant="body2" component="span" fontWeight="bold">
                        목표나 니즈:
                      </Typography>{' '}
                      <Typography variant="body2" component="span">{c.desire}</Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2">고객 경험</Typography>
              <Typography variant="body2">{data.experienceScene}</Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                ⏱ {data.timeRequired}분 / 🔁 {data.frequency}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2">수익 구조</Typography>
              <Box sx={{ bgcolor: 'grey.100', p: 2, borderLeft: '4px solid #2e7d32', my: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  💰 BEP: {data.bep}명 (월 목표 수익: {data.monthlyGoal}원)
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  단골당 수익: {data.incomePerFan}원
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
