import Plot from "react-plotly.js";
import { topFiveTerms } from "../configuration/plotlyUtils";

const Dashboard = ({ facets }) => {
  console.log(Object.keys(facets).length);
  return (
    <div className="chart-container">
      {Object.keys(facets).length === 0 ? (
        "Nothing to Show"
      ) : (
        <Plot
          data={[
            {
              type: "bar",
              x: Object.keys(
                topFiveTerms(facets["subject"])
              ),
              y: Object.values(
                topFiveTerms(facets["subject"])
              ),
              marker: {
                color: [
                  "red",
                  "blue",
                  "green",
                  "blue",
                  "teal",
                  "hotpink",
                ],
              }, //TODO: MAKE LAYOUT STILE VARIABLE
            },
          ]}
          layout={{
            width: 620,
            height: 540,
            title: "Top 5",
            titlefont: {
              size: 36,
            },
            font: {
              size: 12,
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
          }}
          useResizeHandler={true}
        />
      )}

      {Object.keys(facets).length === 0 ? null : (
        <Plot
          data={[
            {
              labels: Object.keys(
                topFiveTerms(facets["variable"])
              ),
              values: Object.values(
                topFiveTerms(facets["variable"])
              ),
              type: "pie",
              domain: {
                row: 0,
                column: 0,
              },
              hoverinfo: "label+percent",
              textinfo: "none",
              hole: 0.3,
            },
          ]}
          layout={{
            width: 620,
            height: 540,
            title: "Variables",
            autosize: true,
            font: {
              size: 18,
            },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
