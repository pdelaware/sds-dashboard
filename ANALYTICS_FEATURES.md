# Analytics Dashboard Features

## 📊 Live URLs

- **GitHub Pages:** https://pdelaware.github.io/sds-dashboard/analytics.html
- **Salesforce Pages:** https://git.soma.salesforce.com/pages/pdelaware/sds-dashboard/analytics.html

## 📈 Dashboard Components

### KPI Cards (Top Stats)
1. **Total SDS Documents** - 2,847 (↑ 12% from last quarter)
2. **Active Locations** - 59 (↑ 3 new this year)
3. **Product Categories** - 17 (Complete coverage)
4. **Compliance Rate** - 100% (All locations current)

All stats feature animated counters on page load.

### Interactive Charts

#### 1. Regional Distribution (Doughnut Chart)
- Americas: 1,287 documents (45%)
- EMEA: 982 documents (35%)
- APAC: 412 documents (14%)
- Middle East: 166 documents (6%)

**Color-coded by region:**
- Americas: Salesforce Blue
- EMEA: Green
- APAC: Amber
- Middle East: Gray

#### 2. Top Product Categories (Bar Chart)
Shows the 5 most common SDS types:
- Cleaning Agent: 542
- Detergent: 398
- Sanitizer: 327
- Floor Care: 284
- Aerosol: 219

#### 3. Documents by Office (Horizontal Bar)
Top 10 offices with most SDS documents:
1. San Francisco - 342
2. New York - 178
3. Toronto - 142
4. Amsterdam - 137
5. Irvine - 124
6. London Tower - 118
7. Paris - 102
8. Boston - 92
9. Tokyo - 89
10. Chicago - 86

**Color-coded by region** for quick visual reference.

#### 4. Monthly Upload Trends (Line Chart)
12-month view of new documents added:
- Shows growth from 187 (Jan) to 372 (Dec)
- Smooth gradient fill under the line
- Reveals seasonal patterns and upload velocity

### Top Locations Table

**15 highest-performing offices** with detailed metrics:
- **Rank** - Position by document count
- **Office** - Location name
- **Region** - Color-coded badge (Americas/EMEA/APAC/Middle East)
- **Documents** - Total SDS count
- **Categories** - Number of product types covered
- **Coverage** - Visual progress bar showing % of 17 categories

## 🎨 Design Features

- **Salesforce Design Language** - Matches H&S Registrar styling
- **Chart.js 4.4.0** - Professional, interactive charts
- **Responsive Layout** - Desktop, tablet, mobile optimized
- **Smooth Animations** - Animated stat counters, hover effects
- **Color System:**
  - Salesforce Blue (#0176D3)
  - Cloud Cyan (#1AB9FF)
  - Status Green (#2e844a)
  - Status Amber (#c66a00)

## 🔗 Navigation Integration

The Analytics link in the left sidebar now correctly routes to:
- `analytics.html` (separate page)

Previously it was a dead `#analytics` anchor link.

## 💡 Future Enhancements

Potential additions:
- Real-time data fetch from Google Sheets
- Filter by date range
- Export to PDF/CSV
- Drill-down views by office
- Compliance alerts/notifications
- Document expiration tracking
- Upload activity by user
- Search within charts

## 📱 Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color ratios
- Responsive font sizing
