# this program reads the given results file (merged) and creates the charts for the given
# data

import sys
import os
import matplotlib.pyplot as plt
import csv

# check if arguments are given (we should have 2). if not, give usage
if len(sys.argv) != 2:
    print("Usage: python3 make_charts.py <results_file>")
    sys.exit(1)


RESULTS_FILE = sys.argv[1]
OUTPUT_DIR = "./charts/"

# check if output directory exists, if not, create it
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)


def make_bar_graph(filepath):
    with open(filepath, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        # skip header
        next(reader)
        # dict of [config] -> [(amount of times it succeeded, qualities)]
        results = {}
        for row in reader:
            file, model, lang, strategy, retries, num_comp, temp,  iters, successes, avg_quality = row
            key = (model, lang, strategy, retries, num_comp, temp, iters)
            if key not in results:
                if successes != "0":
                    results[key] = (1, [float(avg_quality)])
                else:
                    results[key] = (0, [])
            elif successes != "0":
                results[key] = (results[key][0] + 1,
                                results[key][1] + [float(avg_quality)])

        # average out quals, round to 2 decimals
        for key in results:
            if len(results[key][1]) > 0:
                results[key] = (results[key][0], round(
                    sum(results[key][1]) / len(results[key][1]), 2))
            else:
                results[key] = (results[key][0], 0)

        # create bar graph
        # x axis: config
        # y axis: amount of times it succeeded
        x = []
        y = []
        keys_map = {}
        labels = []
        for key, value in results.items():
            ket_str_pre = "{}-{}".format(key[0], key[2])
            if ket_str_pre not in keys_map:
                keys_map[ket_str_pre] = 0
            else:
                keys_map[ket_str_pre] += 1

            ket_str = "{}-{}-{}".format(key[0], key[2], keys_map[ket_str_pre])
            x.append(ket_str)
            y.append(value[0])
            labels.append("Average Quality: {}".format(value[1]))

        # create plot
        fig, ax = plt.subplots()
        ax.bar(x, y)
        ax.set_title("Successes per configuration")
        ax.set_xlabel("Config")
        ax.set_ylabel("Successes")

        # add labels
        for rect, label in zip(ax.patches, labels):
            height = rect.get_height()
            ax.text(rect.get_x() + rect.get_width() / 2, height - 20, label,
                    ha='center', va='bottom')

        fig.tight_layout()
        plt.savefig(OUTPUT_DIR + "successes_per_config.png")
        plt.close()


make_bar_graph(RESULTS_FILE)
